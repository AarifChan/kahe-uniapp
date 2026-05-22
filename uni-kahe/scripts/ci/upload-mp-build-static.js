/**
 * 上传小程序构建产物中的 static 目录到七牛 CDN
 * 用于本地 GUI / 离线打包：编译后从 dist/build/mp-weixin/static 上传
 *
 * 环境变量：
 *   QINIU_ACCESS_KEY, QINIU_SECRET_KEY（必填，或由调用方注入）
 *   ENVIRONMENT=dev|test|prod
 *   UPLOAD_SOURCE_DIR=绝对或相对路径（默认 dist/build/mp-weixin/static）
 *   QINIU_BUCKET, QINIU_CDN_DOMAIN, QINIU_FOLDER（可选，覆盖 config.js）
 *   SKIP_QINIU_UPLOAD=true  仅生成 manifest，不上传七牛（配合 replace-cdn-urls 使用）
 *
 * 上传范围：构建产物 static 下全部文件；若 gif/字体在产物中缺失，会从 src/static 补充。
 * PNG 仍仅做压缩，gif/ttf/woff 等原样上传。
 */

const fs = require("fs");
const path = require("path");
const QiniuClient = require("./lib/qiniu-client");
const { compressStaticPngOrThrow } = require("./lib/compress-static-images");
const { getConfig, PROJECT_ROOT, STATIC_DIR } = require("./lib/config");
const { summarizeAssetTypes } = require("./lib/static-upload-entries");
const logger = require("./lib/logger");

const MANIFEST_PATH = path.join(PROJECT_ROOT, "dist", "asset-manifest.json");

function loadPreviousManifest(qiniuConfig) {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return null;
  }

  try {
    const data = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    const assets = data.assets || data;
    const sameBucket = !data.bucket || data.bucket === qiniuConfig.bucket;
    const sameFolder = !data.folder || data.folder === qiniuConfig.folder;
    const sameDomain = !data.cdnDomain || data.cdnDomain === qiniuConfig.cdnDomain;

    if (!sameBucket || !sameFolder || !sameDomain) {
      logger.info("忽略旧 manifest（七牛配置已变更）", {
        manifestPath: MANIFEST_PATH,
      });
      return null;
    }

    return assets;
  } catch (err) {
    logger.warn(`读取旧 manifest 失败，将全量校验上传: ${err.message}`);
    return null;
  }
}

function resolveUploadDir() {
  const fromEnv = process.env.UPLOAD_SOURCE_DIR;
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(PROJECT_ROOT, fromEnv);
  }
  return path.join(PROJECT_ROOT, "dist", "build", "mp-weixin", "static");
}

function applyQiniuOverrides(qiniuConfig) {
  const cfg = { ...qiniuConfig };
  if (process.env.QINIU_BUCKET) cfg.bucket = process.env.QINIU_BUCKET;
  if (process.env.QINIU_CDN_DOMAIN) cfg.cdnDomain = process.env.QINIU_CDN_DOMAIN;
  if (process.env.QINIU_FOLDER) cfg.folder = process.env.QINIU_FOLDER;
  if (process.env.QINIU_ZONE) cfg.zone = process.env.QINIU_ZONE;
  return cfg;
}

async function main() {
  const env = process.env.ENVIRONMENT || "prod";
  const skipUpload = process.env.SKIP_QINIU_UPLOAD === "true";
  logger.setStage("upload-mp-build-static");
  const uploadDir = resolveUploadDir();

  logger.info(`Upload mp-weixin static from: ${uploadDir}`, {
    environment: env,
    skipUpload,
  });

  const accessKey = process.env.QINIU_ACCESS_KEY;
  const secretKey = process.env.QINIU_SECRET_KEY;
  if (!skipUpload && (!accessKey || !secretKey)) {
    logger.error(
      "缺少七牛凭证。请设置环境变量 QINIU_ACCESS_KEY / QINIU_SECRET_KEY，或在 mp_upload/qiniu_config.json 中配置。"
    );
    process.exit(1);
  }

  if (!fs.existsSync(uploadDir)) {
    logger.warn(`static 目录不存在，跳过压缩与上传: ${uploadDir}`);
    fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
    fs.writeFileSync(
      MANIFEST_PATH,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          environment: env,
          skipUpload,
          totalFiles: 0,
          uploaded: 0,
          skipped: 0,
          assets: {},
        },
        null,
        2
      )
    );
    return;
  }

  const qiniuConfig = applyQiniuOverrides(getConfig(env).qiniu);
  const cachedAssets = loadPreviousManifest(qiniuConfig);

  let manifest;
  let uploaded = 0;
  let skipped = 0;
  let cached = 0;
  let mapped = 0;
  let refreshed = [];
  let supplemented = 0;

  if (skipUpload) {
    logger.info("SKIP_QINIU_UPLOAD=true：跳过七牛上传，仅生成 manifest 供 CDN 替换");
    if (!cachedAssets) {
      logger.warn(
        "未找到 asset-manifest.json，将按七牛目录规则生成 CDN 地址（请确保资源已在 CDN 上）"
      );
    }

    const client = new QiniuClient({
      accessKey: accessKey || "skip",
      secretKey: secretKey || "skip",
      bucket: qiniuConfig.bucket,
      cdnDomain: qiniuConfig.cdnDomain,
      folder: qiniuConfig.folder,
      zone: process.env.QINIU_ZONE || qiniuConfig.zone,
    });

    const result = client.buildManifestOnly(uploadDir, {
      supplementDir: STATIC_DIR,
      preserveFileName: true,
      cachedAssets,
    });
    manifest = result.manifest;
    cached = result.cached;
    mapped = result.mapped;
    supplemented = result.supplemented;
  } else {
    // 上传前压缩 PNG，减小包体与 CDN 流量
    compressStaticPngOrThrow(uploadDir);

    const client = new QiniuClient({
      accessKey,
      secretKey,
      bucket: qiniuConfig.bucket,
      cdnDomain: qiniuConfig.cdnDomain,
      folder: qiniuConfig.folder,
      zone: process.env.QINIU_ZONE || qiniuConfig.zone,
    });

    if (cachedAssets) {
      logger.info(`已加载上次 manifest，未变更文件将跳过七牛上传`, {
        cachedFiles: Object.keys(cachedAssets).length,
      });
    }

    const result = await client.uploadDirectory(uploadDir, {
      supplementDir: STATIC_DIR,
      preserveFileName: true,
      cachedAssets,
    });
    manifest = result.manifest;
    uploaded = result.uploaded;
    skipped = result.skipped;
    cached = result.cached;
    refreshed = result.refreshed;
    supplemented = result.supplemented;
  }

  const cdnStaticPrefix = `${qiniuConfig.cdnDomain.replace(/\/$/, "")}/${qiniuConfig.folder.replace(/\/$/, "")}/`;

  const typeSummary = summarizeAssetTypes(
    Object.keys(manifest).map((relativePath) => ({ relativePath }))
  );

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        environment: env,
        skipUpload,
        sourceDir: uploadDir,
        supplementDir: STATIC_DIR,
        supplementedCount: supplemented,
        preserveFileName: true,
        cdnStaticPrefix,
        assetTypeSummary: typeSummary,
        bucket: qiniuConfig.bucket,
        cdnDomain: qiniuConfig.cdnDomain,
        folder: qiniuConfig.folder,
        totalFiles: Object.keys(manifest).length,
        uploaded,
        skipped,
        cached,
        mapped,
        refreshedCount: refreshed.length,
        assets: manifest,
      },
      null,
      2
    )
  );

  logger.info("Mp static upload completed", {
    totalFiles: Object.keys(manifest).length,
    uploaded,
    skipped,
    cached,
    mapped,
    skipUpload,
    manifestPath: MANIFEST_PATH,
  });

  console.log("\n=== MP STATIC UPLOAD SUMMARY ===");
  console.log(`Source: ${uploadDir}`);
  console.log(`Mode: ${skipUpload ? "manifest only (no Qiniu upload)" : "incremental upload"}`);
  console.log(`Supplement (src/static gif/font): ${supplemented}`);
  console.log(`PNG: ${typeSummary.png}, JPG: ${typeSummary.jpg}, GIF: ${typeSummary.gif}, 字体: ${typeSummary.font}, 其他: ${typeSummary.other}`);
  console.log(`Total files: ${Object.keys(manifest).length}`);
  if (skipUpload) {
    console.log(`Manifest cache hits: ${cached}`);
    console.log(`Mapped from CDN path (no upload): ${mapped}`);
  } else {
    console.log(`Uploaded (changed/new): ${uploaded}`);
    console.log(`Skipped (remote unchanged): ${skipped}`);
    console.log(`Skipped (local manifest cache): ${cached}`);
    if (uploaded === 0) {
      console.log("No files uploaded — images unchanged, CDN replace will still run.");
    }
  }
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log("================================\n");
}

main().catch((err) => {
  logger.error("Mp static upload failed", { error: err.message, stack: err.stack });
  process.exit(1);
});
