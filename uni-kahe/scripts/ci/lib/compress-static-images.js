/**
 * 压缩 static 目录下的 PNG（上传七牛前减小体积）
 * 依赖系统已安装 pngquant：macOS 可执行 brew install pngquant
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const logger = require("./logger");

function hasPngquant() {
  try {
    execSync("which pngquant", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * @param {string} rootDir - static 根目录
 * @param {{ quality?: string, pngOnly?: boolean }} options
 */
function compressStaticImages(rootDir, options = {}) {
  const quality = options.quality || process.env.PNGQUANT_QUALITY || "65-80";
  const pngOnly = options.pngOnly !== false;
  const results = { compressed: [], skipped: [], errors: [] };

  if (!fs.existsSync(rootDir)) {
    return results;
  }

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;

      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      const isPng = /\.png$/i.test(entry.name);
      const isJpeg = /\.(jpe?g)$/i.test(entry.name);
      if (!isPng && !(isJpeg && !pngOnly)) {
        continue;
      }

      try {
        const before = fs.statSync(fullPath).size;
        if (isPng) {
          execSync(
            `pngquant --quality=${quality} --skip-if-larger --force --output "${fullPath}" "${fullPath}"`,
            { stdio: "ignore" }
          );
        } else if (!pngOnly) {
          execSync(`jpegoptim --strip-all --max=85 "${fullPath}"`, { stdio: "ignore" });
        }
        const after = fs.statSync(fullPath).size;
        const item = {
          file: path.relative(rootDir, fullPath),
          before,
          after,
          saved: Math.max(0, before - after),
        };
        if (after < before) {
          results.compressed.push(item);
        } else {
          results.skipped.push(item);
        }
      } catch (err) {
        results.errors.push({ file: path.relative(rootDir, fullPath), error: err.message });
        logger.warn(`压缩跳过: ${fullPath}`, { error: err.message });
      }
    }
  }

  walk(rootDir);
  return results;
}

/**
 * 压缩目录内 PNG，缺少 pngquant 时按 strict 决定是否退出
 */
function compressStaticPngOrThrow(rootDir) {
  const strict = process.env.COMPRESS_PNG_STRICT !== "false";
  const enabled = process.env.COMPRESS_PNG !== "false";

  if (!enabled) {
    logger.info("已跳过 PNG 压缩（COMPRESS_PNG=false）");
    return { compressed: [], skipped: [], errors: [] };
  }

  if (!hasPngquant()) {
    const msg =
      "未找到 pngquant，无法压缩 PNG。请安装：brew install pngquant";
    if (strict) {
      throw new Error(msg);
    }
    logger.warn(msg);
    return { compressed: [], skipped: [], errors: [] };
  }

  logger.info(`开始压缩 PNG: ${rootDir}`);
  const results = compressStaticImages(rootDir, { pngOnly: true });
  const totalSaved = results.compressed.reduce((s, c) => s + c.saved, 0);

  logger.info("PNG 压缩完成", {
    compressed: results.compressed.length,
    unchanged: results.skipped.length,
    errors: results.errors.length,
    saved: formatBytes(totalSaved),
  });

  console.log("\n=== PNG COMPRESS SUMMARY ===");
  console.log(`目录: ${rootDir}`);
  console.log(`已压缩: ${results.compressed.length} 个`);
  console.log(`未变小(跳过): ${results.skipped.length} 个`);
  console.log(`失败: ${results.errors.length} 个`);
  console.log(`共节省: ${formatBytes(totalSaved)}`);
  console.log("============================\n");

  return results;
}

module.exports = {
  hasPngquant,
  compressStaticImages,
  compressStaticPngOrThrow,
};
