/**
 * 单独执行：压缩 dist/build/mp-weixin/static 下的 PNG
 * 环境变量：UPLOAD_SOURCE_DIR、PNGQUANT_QUALITY（默认 65-80）
 */

const path = require("path");
const { PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");
const { compressStaticPngOrThrow } = require("./lib/compress-static-images");

function resolveStaticDir() {
  const fromEnv = process.env.UPLOAD_SOURCE_DIR;
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(PROJECT_ROOT, fromEnv);
  }
  return path.join(PROJECT_ROOT, "dist", "build", "mp-weixin", "static");
}

async function main() {
  logger.setStage("compress-mp-static-images");
  const staticDir = resolveStaticDir();
  compressStaticPngOrThrow(staticDir);
}

main().catch((err) => {
  logger.error("PNG compress failed", { error: err.message });
  process.exit(1);
});
