/**
 * 上传静态资源到七牛 CDN
 * 流程：
 * 1. 扫描 src/static/ 目录
 * 2. 计算内容哈希，生成带 hash 的文件名
 * 3. 通过 ETag 比对跳过未变更文件
 * 4. 上传后刷新 CDN 缓存
 * 5. 生成 asset-manifest.json 供后续替换使用
 *
 * 环境变量（Jenkins Credential Store 注入）：
 *   QINIU_ACCESS_KEY, QINIU_SECRET_KEY
 * 环境变量（Jenkins 参数）：
 *   ENVIRONMENT=dev|test|prod
 */

const fs = require("fs");
const path = require("path");
const QiniuClient = require("./lib/qiniu-client");
const { getConfig, STATIC_DIR, PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");

const MANIFEST_PATH = path.join(PROJECT_ROOT, "dist", "asset-manifest.json");

async function main() {
  const env = process.env.ENVIRONMENT || "dev";
  logger.setStage("upload-assets");
  logger.info(`Starting asset upload for environment: ${env}`);

  const config = getConfig(env);
  const qiniuConfig = config.qiniu;

  // 检查凭证
  const accessKey = process.env.QINIU_ACCESS_KEY;
  const secretKey = process.env.QINIU_SECRET_KEY;

  if (!accessKey || !secretKey) {
    logger.error("Qiniu credentials not found. Please configure QINIU_ACCESS_KEY and QINIU_SECRET_KEY in Jenkins Credential Store.");
    process.exit(1);
  }

  // 检查 static 目录
  if (!fs.existsSync(STATIC_DIR)) {
    logger.error(`Static directory not found: ${STATIC_DIR}`);
    process.exit(1);
  }

  const client = new QiniuClient({
    accessKey,
    secretKey,
    bucket: qiniuConfig.bucket,
    cdnDomain: qiniuConfig.cdnDomain,
    folder: qiniuConfig.folder,
  });

  logger.info("Scanning static assets...", { dir: STATIC_DIR });

  const { manifest, uploaded, skipped, refreshed } = await client.uploadDirectory(STATIC_DIR);

  // 写入 manifest
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        environment: env,
        bucket: qiniuConfig.bucket,
        cdnDomain: qiniuConfig.cdnDomain,
        folder: qiniuConfig.folder,
        totalFiles: Object.keys(manifest).length,
        uploaded,
        skipped,
        refreshedCount: refreshed.length,
        assets: manifest,
      },
      null,
      2
    )
  );

  logger.info("Asset upload completed", {
    totalFiles: Object.keys(manifest).length,
    uploaded,
    skipped,
    refreshed: refreshed.length,
    manifestPath: MANIFEST_PATH,
  });

  // 输出 summary 供 Jenkins 读取
  console.log("\n=== UPLOAD SUMMARY ===");
  console.log(`Total files: ${Object.keys(manifest).length}`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped (unchanged): ${skipped}`);
  console.log(`CDN refreshed: ${refreshed.length}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log("======================\n");
}

main().catch((err) => {
  logger.error("Asset upload failed", { error: err.message, stack: err.stack });
  process.exit(1);
});
