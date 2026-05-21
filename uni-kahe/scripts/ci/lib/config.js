/**
 * CI 环境配置中心
 * 支持 dev / test / prod 环境参数化
 * 所有敏感信息通过环境变量注入（Jenkins Credential Store）
 */

const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../../..");

// 环境配置
const ENV_CONFIGS = {
  dev: {
    name: "development",
    apiBaseUrl: process.env.DEV_API_BASEURL || "https://kahe-tapi.85gui7.com/api",
    // 微信小程序测试号 appid（需替换为实际值）
    mpWeixinAppid: process.env.DEV_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    // 支付宝小程序测试号 appid
    mpAlipayAppid: process.env.DEV_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "91tcg",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.91tcg.com",
      folder: "kahe-202510/dev",
    },
    upload: {
      // 微信：预览模式不上传，test 环境可配置为体验版
      weixin: {
        preview: true,
        version: "1.0.0",
        desc: "dev build",
      },
      alipay: {
        preview: true,
        version: "1.0.0",
        desc: "dev build",
      },
    },
  },
  test: {
    name: "test",
    apiBaseUrl: process.env.TEST_API_BASEURL || "https://kahe-tapi.85gui7.com/api",
    mpWeixinAppid: process.env.TEST_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    mpAlipayAppid: process.env.TEST_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "91tcg",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.91tcg.com",
      folder: "kahe-202510/test",
    },
    upload: {
      weixin: {
        preview: false,
        version: "1.0.0",
        desc: "test build",
      },
      alipay: {
        preview: false,
        version: "1.0.0",
        desc: "test build",
      },
    },
  },
  prod: {
    name: "production",
    apiBaseUrl: process.env.PROD_API_BASEURL || "https://kahe-api.85gui7.com/api",
    mpWeixinAppid: process.env.PROD_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    mpAlipayAppid: process.env.PROD_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "91tcg",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.91tcg.com",
      folder: "kahe-202510/prod",
    },
    upload: {
      weixin: {
        preview: false,
        version: "",
        desc: "",
      },
      alipay: {
        preview: false,
        version: "",
        desc: "",
      },
    },
  },
};

// 平台配置
const PLATFORM_CONFIGS = {
  "mp-weixin": {
    distDir: "dist/build/mp-weixin",
    cliName: "miniprogram-ci",
  },
  "mp-alipay": {
    distDir: "dist/build/mp-alipay",
    cliName: "miniu",
  },
};

/**
 * 获取当前环境配置
 * @param {string} env - dev | test | prod
 * @returns {object}
 */
function getConfig(env) {
  const config = ENV_CONFIGS[env];
  if (!config) {
    throw new Error(`Unknown environment: ${env}. Expected: dev, test, prod`);
  }
  return config;
}

/**
 * 获取平台配置
 * @param {string} platform - mp-weixin | mp-alipay
 * @returns {object}
 */
function getPlatformConfig(platform) {
  const config = PLATFORM_CONFIGS[platform];
  if (!config) {
    throw new Error(`Unknown platform: ${platform}. Expected: mp-weixin, mp-alipay`);
  }
  return config;
}

/**
 * 从 git 标签或 Jenkins BUILD_NUMBER 生成版本号
 * @returns {string}
 */
function getVersion() {
  // Jenkins 传入的 GIT_TAG 或 BUILD_NUMBER
  const gitTag = process.env.GIT_TAG || "";
  const buildNumber = process.env.BUILD_NUMBER || "0";

  if (gitTag) {
    // v1.2.3 -> 1.2.3
    return gitTag.replace(/^v/, "");
  }

  // 从 package.json 读取基础版本号
  try {
    const pkg = require(path.join(PROJECT_ROOT, "package.json"));
    const baseVersion = pkg.version || "1.0.0";
    const [major, minor, patch] = baseVersion.split(".");
    // 1.0.0 + build 123 -> 1.0.123
    return `${major}.${minor}.${buildNumber}`;
  } catch {
    return `1.0.${buildNumber}`;
  }
}

/**
 * 生成版本描述
 * @returns {string}
 */
function getVersionDesc() {
  const env = process.env.ENVIRONMENT || "dev";
  const buildNumber = process.env.BUILD_NUMBER || "0";
  const gitCommit = (process.env.GIT_COMMIT || "unknown").slice(0, 7);
  const gitBranch = process.env.GIT_BRANCH || "unknown";
  const changelog = process.env.CHANGELOG || "";

  const lines = [
    `环境: ${env}`,
    `构建: #${buildNumber}`,
    `分支: ${gitBranch}`,
    `Commit: ${gitCommit}`,
  ];

  if (changelog) {
    lines.push(`\n变更日志:\n${changelog}`);
  }

  return lines.join("\n");
}

module.exports = {
  PROJECT_ROOT,
  STATIC_DIR: path.join(PROJECT_ROOT, "src/static"),
  DIST_DIR: path.join(PROJECT_ROOT, "dist"),
  MANIFEST_PATH: path.join(PROJECT_ROOT, "src/manifest.json"),
  getConfig,
  getPlatformConfig,
  getVersion,
  getVersionDesc,
  ENV_CONFIGS,
};
