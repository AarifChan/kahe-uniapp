/**
 * 构建后替换 /static/ 为七牛 CDN URL
 * 处理文件类型：.js, .css, .wxml, .wxss, .json, .html
 *
 * 流程：
 * 1. 读取 dist/asset-manifest.json
 * 2. 遍历 dist/build/ 目录
 * 3. 在每个文件中查找 /static/xxx 引用
 * 4. 替换为对应的 CDN URL
 *
 * 注意：
 * - 字体文件（.ttf, .woff）在小程序中有限制，但仍按配置替换
 * - 替换时保留原始引号包裹方式
 * - 动态模板路径（如 `/static/.../tag-level${tag}.png`）在 preserveFileName 模式下做前缀替换
 */

const fs = require("fs");
const path = require("path");
const { getConfig, PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");
const {
  buildCdnStaticPrefix,
  replaceRemainingStaticPrefixes,
} = require("./lib/replace-static-prefix");

const MANIFEST_PATH = path.join(PROJECT_ROOT, "dist", "asset-manifest.json");
const SUPPORTED_EXTS = new Set([
  ".js", ".css", ".wxml", ".wxss", ".html", ".vue",
  ".scss", ".less", ".ts", ".jsx", ".tsx",
]);

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Asset manifest not found: ${MANIFEST_PATH}. Run upload-assets.js first.`);
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 在文件中安全替换 /static/ 路径
 */
function replaceInFile(filePath, manifestData) {
  const content = fs.readFileSync(filePath, "utf-8");
  let modified = content;
  let replacements = 0;
  const assets = manifestData.assets || manifestData;

  for (const [relativePath, info] of Object.entries(assets)) {
    const normPath = relativePath.replace(/\\/g, "/");
    const staticPaths = ["/static/" + normPath, "static/" + normPath];

    // 构建各种可能的匹配模式（含小程序构建后常见的 static/ 无前导斜杠写法）
    const patterns = [];
    for (const staticPath of staticPaths) {
      const esc = escapeRegex(staticPath);
      patterns.push(
        { regex: new RegExp(`"${esc}"`, "g"), replacement: `"${info.cdnUrl}"` },
        { regex: new RegExp(`'${esc}'`, "g"), replacement: `'${info.cdnUrl}'` },
        { regex: new RegExp(`\`${esc}\``, "g"), replacement: `\`${info.cdnUrl}\`` },
        { regex: new RegExp(`url\\(${esc}\\)`, "g"), replacement: `url(${info.cdnUrl})` },
        { regex: new RegExp(`url\\("${esc}"\\)`, "g"), replacement: `url("${info.cdnUrl}")` },
        { regex: new RegExp(`url\\('${esc}'\\)`, "g"), replacement: `url('${info.cdnUrl}')` }
      );
    }

    for (const { regex, replacement } of patterns) {
      const matches = modified.match(regex);
      if (matches) {
        modified = modified.replace(regex, replacement);
        replacements += matches.length;
      }
    }
  }

  const cdnPrefix =
    manifestData.cdnStaticPrefix ||
    buildCdnStaticPrefix(manifestData.cdnDomain, manifestData.folder);

  if (manifestData.preserveFileName === true && cdnPrefix) {
    const { content: afterPrefix, count: prefixCount } = replaceRemainingStaticPrefixes(
      modified,
      cdnPrefix
    );
    if (prefixCount > 0) {
      modified = afterPrefix;
      replacements += prefixCount;
    }
  }

  if (replacements > 0) {
    fs.writeFileSync(filePath, modified, "utf-8");
    logger.info(`Replaced ${replacements} URLs in ${path.relative(PROJECT_ROOT, filePath)}`);
  }

  return replacements;
}

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (SUPPORTED_EXTS.has(path.extname(entry.name).toLowerCase())) {
      callback(fullPath);
    }
  }
}

async function main() {
  const env = process.env.ENVIRONMENT || "dev";
  const platform = process.env.PLATFORM || "mp-weixin";
  logger.setStage("replace-cdn-urls");

  const config = getConfig(env);
  const distDir = path.join(PROJECT_ROOT, "dist", "build", platform);

  if (!fs.existsSync(distDir)) {
    logger.error(`Build output not found: ${distDir}. Run build first.`);
    process.exit(1);
  }

  const manifest = loadManifest();
  const assetCount = Object.keys(manifest.assets || {}).length;
  logger.info(`Loaded manifest: ${assetCount} assets`, {
    manifestPath: MANIFEST_PATH,
    distDir,
    preserveFileName: manifest.preserveFileName,
    cdnStaticPrefix: manifest.cdnStaticPrefix,
  });

  let totalReplacements = 0;
  let processedFiles = 0;
  const remainingStaticFiles = [];

  walkDir(distDir, (filePath) => {
    const count = replaceInFile(filePath, manifest);
    if (count > 0) {
      totalReplacements += count;
      processedFiles++;
    }
    const after = fs.readFileSync(filePath, "utf-8");
    if (after.includes("/static/")) {
      remainingStaticFiles.push(path.relative(distDir, filePath));
    }
  });

  logger.info("CDN URL replacement completed", {
    processedFiles,
    totalReplacements,
    cdnDomain: config.qiniu.cdnDomain,
    preserveFileName: manifest.preserveFileName,
    remainingStaticFiles: remainingStaticFiles.length,
  });

  console.log("\n=== REPLACE SUMMARY ===");
  console.log(`Processed files: ${processedFiles}`);
  console.log(`Total replacements: ${totalReplacements}`);
  if (manifest.preserveFileName === true) {
    console.log("Dynamic /static/ prefix replace: enabled (preserveFileName)");
  }
  if (remainingStaticFiles.length > 0) {
    console.log(`WARNING: ${remainingStaticFiles.length} files still contain /static/:`);
    remainingStaticFiles.slice(0, 20).forEach((f) => console.log(`  - ${f}`));
    if (remainingStaticFiles.length > 20) {
      console.log(`  ... and ${remainingStaticFiles.length - 20} more`);
    }
  } else {
    console.log("All /static/ references replaced.");
  }
  console.log("========================\n");

  if (remainingStaticFiles.length > 0 && process.env.FAIL_ON_UNREPLACED_STATIC === "true") {
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("CDN URL replacement failed", { error: err.message, stack: err.stack });
  process.exit(1);
});
