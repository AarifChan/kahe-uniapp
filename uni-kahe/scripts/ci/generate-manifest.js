/**
 * 按环境生成 manifest.json
 * 根据 ENVIRONMENT 和 PLATFORM 注入对应的 appid、版本号
 *
 * 注意：此脚本会修改 src/manifest.json，但会在构建后恢复
 */

const fs = require("fs");
const path = require("path");
const { getConfig, getVersion, MANIFEST_PATH, PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");

const MANIFEST_BACKUP_PATH = path.join(PROJECT_ROOT, "src", ".manifest.json.backup");

function generateManifest(env, platform) {
  const config = getConfig(env);
  const version = getVersion();
  const [major, minor, patch] = version.split(".");
  const versionCode = parseInt(major) * 10000 + parseInt(minor) * 100 + parseInt(patch);

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));

  // 更新基础信息
  manifest.versionName = version;
  manifest.versionCode = String(versionCode);

  // 更新平台 appid
  if (platform === "mp-weixin") {
    if (!manifest["mp-weixin"]) manifest["mp-weixin"] = {};
    manifest["mp-weixin"].appid = config.mpWeixinAppid;
  } else if (platform === "mp-alipay") {
    if (!manifest["mp-alipay"]) manifest["mp-alipay"] = {};
    manifest["mp-alipay"].appid = config.mpAlipayAppid;
  }

  return manifest;
}

function backupManifest() {
  if (!fs.existsSync(MANIFEST_BACKUP_PATH)) {
    fs.copyFileSync(MANIFEST_PATH, MANIFEST_BACKUP_PATH);
    logger.info("Manifest backup created");
  }
}

function restoreManifest() {
  if (fs.existsSync(MANIFEST_BACKUP_PATH)) {
    fs.copyFileSync(MANIFEST_BACKUP_PATH, MANIFEST_PATH);
    fs.unlinkSync(MANIFEST_BACKUP_PATH);
    logger.info("Manifest restored from backup");
  }
}

async function main() {
  const env = process.env.ENVIRONMENT || "dev";
  const platform = process.env.PLATFORM || "mp-weixin";
  const action = process.argv[2] || "generate"; // generate | restore

  logger.setStage("generate-manifest");

  if (action === "restore") {
    restoreManifest();
    return;
  }

  logger.info(`Generating manifest for ${env} / ${platform}`);

  backupManifest();

  const manifest = generateManifest(env, platform);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 4), "utf-8");

  logger.info("Manifest generated", {
    versionName: manifest.versionName,
    versionCode: manifest.versionCode,
    platform,
    appid: platform === "mp-weixin" ? manifest["mp-weixin"].appid : manifest["mp-alipay"]?.appid,
  });
}

main().catch((err) => {
  logger.error("Manifest generation failed", { error: err.message });
  process.exit(1);
});
