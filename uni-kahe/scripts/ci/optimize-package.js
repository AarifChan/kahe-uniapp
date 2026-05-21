/**
 * 小程序包体积分析与优化
 * 目标：
 * - 主包 < 2MB
 * - 分包 < 2MB
 * - 总包 < 20MB
 *
 * 功能：
 * 1. 分析 dist/build/ 目录各包体积
 * 2. 压缩图片（pngquant/jpegoptim，可选）
 * 3. 移除 source map（生产环境）
 * 4. 检查阈值并生成报告
 * 5. 超出阈值时可选 fail build
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");

const SIZE_LIMITS = {
  main: 2 * 1024 * 1024,      // 2MB
  subPackage: 2 * 1024 * 1024, // 2MB
  total: 20 * 1024 * 1024,     // 20MB
};

function getDirSize(dir) {
  let total = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirSize(fullPath);
    } else {
      total += fs.statSync(fullPath).size;
    }
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzePackage(buildDir) {
  const pagesJsonPath = path.join(buildDir, "pages.json");
  const appJsonPath = path.join(buildDir, "app.json");

  // UniApp 构建后可能是 app.json 或 pages.json
  const configPath = fs.existsSync(pagesJsonPath) ? pagesJsonPath : appJsonPath;
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  const report = {
    main: { size: 0, files: 0 },
    subPackages: [],
    total: 0,
    warnings: [],
  };

  // 计算主包大小（根目录排除 subPackages）
  const subPackageRoots = new Set(
    (config.subPackages || []).map((sp) => sp.root).filter(Boolean)
  );

  const entries = fs.readdirSync(buildDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(buildDir, entry.name);
    if (entry.isDirectory() && !subPackageRoots.has(entry.name)) {
      const size = getDirSize(fullPath);
      report.main.size += size;
      report.main.files++;
    } else if (entry.isFile()) {
      report.main.size += fs.statSync(fullPath).size;
      report.main.files++;
    }
  }

  // 计算分包大小
  if (config.subPackages) {
    for (const sp of config.subPackages) {
      if (!sp.root) continue;
      const spDir = path.join(buildDir, sp.root);
      if (fs.existsSync(spDir)) {
        const size = getDirSize(spDir);
        report.subPackages.push({
          root: sp.root,
          name: sp.name || sp.root,
          size,
          limit: SIZE_LIMITS.subPackage,
          exceeded: size > SIZE_LIMITS.subPackage,
        });
      }
    }
  }

  report.total = report.main.size + report.subPackages.reduce((s, sp) => s + sp.size, 0);

  // 检查阈值
  if (report.main.size > SIZE_LIMITS.main) {
    report.warnings.push(
      `主包体积 ${formatBytes(report.main.size)} 超出限制 ${formatBytes(SIZE_LIMITS.main)}`
    );
  }

  for (const sp of report.subPackages) {
    if (sp.exceeded) {
      report.warnings.push(
        `分包 "${sp.name}" 体积 ${formatBytes(sp.size)} 超出限制 ${formatBytes(SIZE_LIMITS.subPackage)}`
      );
    }
  }

  if (report.total > SIZE_LIMITS.total) {
    report.warnings.push(
      `总包体积 ${formatBytes(report.total)} 超出限制 ${formatBytes(SIZE_LIMITS.total)}`
    );
  }

  return report;
}

function removeSourceMaps(buildDir) {
  const removed = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".map")) {
        fs.unlinkSync(fullPath);
        removed.push(path.relative(buildDir, fullPath));
      }
    }
  }
  walk(buildDir);
  return removed;
}

function compressImages(buildDir) {
  const compressed = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        try {
          const before = fs.statSync(fullPath).size;
          if (entry.name.endsWith(".png")) {
            execSync(`pngquant --quality=80-95 --force --output "${fullPath}" "${fullPath}"`, {
              stdio: "ignore",
            });
          } else {
            execSync(`jpegoptim --strip-all --max=85 "${fullPath}"`, {
              stdio: "ignore",
            });
          }
          const after = fs.statSync(fullPath).size;
          if (after < before) {
            compressed.push({
              file: path.relative(buildDir, fullPath),
              before,
              after,
              saved: before - after,
            });
          }
        } catch (err) {
          logger.warn(`Image compression skipped for ${fullPath}: ${err.message}`);
        }
      }
    }
  }
  walk(buildDir);
  return compressed;
}

async function main() {
  const platform = process.env.PLATFORM || "mp-weixin";
  const env = process.env.ENVIRONMENT || "dev";
  const shouldCompress = process.env.COMPRESS_IMAGES === "true";
  const shouldRemoveMaps = process.env.REMOVE_SOURCE_MAPS !== "false";
  const failOnWarning = process.env.FAIL_ON_SIZE_LIMIT === "true";

  logger.setStage("optimize-package");

  const buildDir = path.join(PROJECT_ROOT, "dist", "build", platform);
  if (!fs.existsSync(buildDir)) {
    logger.error(`Build output not found: ${buildDir}`);
    process.exit(1);
  }

  logger.info("Analyzing package sizes...", { buildDir });

  let report = analyzePackage(buildDir);

  // 移除 source map
  if (shouldRemoveMaps && env !== "dev") {
    const removed = removeSourceMaps(buildDir);
    logger.info(`Removed ${removed.length} source map files`);
    // 重新分析
    report = analyzePackage(buildDir);
  }

  // 压缩图片
  if (shouldCompress) {
    const compressed = compressImages(buildDir);
    const totalSaved = compressed.reduce((s, c) => s + c.saved, 0);
    logger.info(`Compressed ${compressed.length} images, saved ${formatBytes(totalSaved)}`);
    if (compressed.length > 0) {
      report = analyzePackage(buildDir);
    }
  }

  // 生成报告文件
  const reportPath = path.join(PROJECT_ROOT, "dist", "package-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // 控制台输出
  console.log("\n=== PACKAGE SIZE REPORT ===");
  console.log(`主包: ${formatBytes(report.main.size)} / ${formatBytes(SIZE_LIMITS.main)}`);
  console.log(`分包数量: ${report.subPackages.length}`);
  for (const sp of report.subPackages) {
    const status = sp.exceeded ? "[超出]" : "[正常]";
    console.log(`  ${status} ${sp.name}: ${formatBytes(sp.size)} / ${formatBytes(SIZE_LIMITS.subPackage)}`);
  }
  console.log(`总计: ${formatBytes(report.total)} / ${formatBytes(SIZE_LIMITS.total)}`);

  if (report.warnings.length > 0) {
    console.log("\n⚠️  警告:");
    for (const w of report.warnings) {
      console.log(`  - ${w}`);
    }
  }

  console.log(`\n报告文件: ${reportPath}`);
  console.log("============================\n");

  logger.info("Package optimization completed", {
    mainSize: report.main.size,
    subPackages: report.subPackages.length,
    totalSize: report.total,
    warnings: report.warnings.length,
  });

  if (failOnWarning && report.warnings.length > 0) {
    logger.error("Package size limits exceeded, failing build");
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("Package optimization failed", { error: err.message });
  process.exit(1);
});
