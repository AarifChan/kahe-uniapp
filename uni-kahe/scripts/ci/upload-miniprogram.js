/**
 * 小程序平台 CLI 上传封装
 * 支持微信（miniprogram-ci）和支付宝（miniu）
 *
 * 环境变量：
 *   ENVIRONMENT=dev|test|prod
 *   PLATFORM=mp-weixin|mp-alipay
 *   WEIXIN_PRIVATE_KEY_PATH - 微信 private.key 文件路径（Jenkins Secret File）
 *   ALIPAY_TOKEN - 支付宝 miniu CLI token
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { getConfig, getPlatformConfig, getVersion, getVersionDesc, PROJECT_ROOT } = require("./lib/config");
const logger = require("./lib/logger");

async function uploadWeixin({ appid, version, desc, projectPath, privateKeyPath }) {
  const ci = require("miniprogram-ci");

  if (!privateKeyPath || !fs.existsSync(privateKeyPath)) {
    throw new Error(
      `WeChat private key not found: ${privateKeyPath}. ` +
        "Upload it to Jenkins Credential Store as a 'Secret file' and bind to WEIXIN_PRIVATE_KEY_PATH."
    );
  }

  const project = new ci.Project({
    appid,
    type: "miniProgram",
    projectPath,
    privateKeyPath,
    ignores: ["node_modules/**/*"],
  });

  logger.info("Uploading to WeChat...", { appid, version });

  const result = await ci.upload({
    project,
    version,
    desc,
    setting: {
      es6: true,
      es7: true,
      minify: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
    },
    onProgressUpdate: (info) => {
      if (info._msg) {
        logger.info(info._msg);
      }
    },
  });

  logger.info("WeChat upload completed", { subPackageInfo: result.subPackageInfo });
  return result;
}

async function uploadAlipay({ appid, version, desc, projectPath, token }) {
  if (!token) {
    throw new Error(
      "Alipay token not found. Set ALIPAY_TOKEN environment variable from Jenkins Credential Store."
    );
  }

  logger.info("Uploading to Alipay...", { appid, version });

  // 使用 miniu CLI 上传
  // 需要先登录: miniu login -t <token>
  execSync(`npx miniu login -t "${token}"`, { stdio: "inherit" });

  const cmd = [
    "npx", "miniu", "upload",
    "--project", projectPath,
    "--version", version,
    "--desc", desc,
    "--app-id", appid,
  ];

  execSync(cmd.join(" "), { stdio: "inherit" });

  logger.info("Alipay upload completed");
}

async function main() {
  const env = process.env.ENVIRONMENT || "dev";
  const platform = process.env.PLATFORM || "mp-weixin";
  logger.setStage("upload-miniprogram");

  const config = getConfig(env);
  const platformConfig = getPlatformConfig(platform);
  const projectPath = path.join(PROJECT_ROOT, platformConfig.distDir);

  if (!fs.existsSync(projectPath)) {
    logger.error(`Build output not found: ${projectPath}`);
    process.exit(1);
  }

  const version = getVersion();
  const desc = getVersionDesc();

  logger.info(`Preparing upload: ${platform} v${version}`, {
    environment: env,
    projectPath,
  });

  try {
    if (platform === "mp-weixin") {
      await uploadWeixin({
        appid: config.mpWeixinAppid,
        version,
        desc,
        projectPath,
        privateKeyPath: process.env.WEIXIN_PRIVATE_KEY_PATH,
      });
    } else if (platform === "mp-alipay") {
      await uploadAlipay({
        appid: config.mpAlipayAppid,
        version,
        desc,
        projectPath,
        token: process.env.ALIPAY_TOKEN,
      });
    } else {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    logger.info("Miniapp upload completed successfully", { version, platform, env });

    // 输出二维码文件路径（微信上传后会生成）
    const qrPath = path.join(PROJECT_ROOT, "dist", "upload-qr.png");
    if (fs.existsSync(qrPath)) {
      console.log(`\n=== UPLOAD QR CODE ===`);
      console.log(`QR Code: ${qrPath}`);
      console.log("======================\n");
    }
  } catch (err) {
    logger.error("Miniapp upload failed", { error: err.message, stack: err.stack });
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("Unexpected error", { error: err.message });
  process.exit(1);
});
