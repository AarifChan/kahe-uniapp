/**
 * CI 环境配置中心
 * 支持 dev / test / prod 环境参数化
 * 所有敏感信息通过环境变量注入（Jenkins Credential Store）
 */

const path = require("path");
const fs = require("fs");

const PROJECT_ROOT = path.resolve(__dirname, "../../..");

/**
 * 轻量级 .env 加载器（零依赖）
 * - 从根目录 .env.development / .env.production 读取（与 Vite 使用同一组文件）
 * - 仅填充尚未存在于 process.env 的变量，保证 Jenkins / Shell 注入的值优先
 * - 支持 KEY=VALUE，忽略空行与 # 注释，去除可选的成对引号
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }
  const content = fs.readFileSync(filePath, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// 根据 ENVIRONMENT 选择对应的根目录 .env 文件（dev -> development，test/prod -> production）
const ENV_FILE_MAP = {
  dev: ".env.development",
  test: ".env.production",
  prod: ".env.production",
};
const ENV_SELECTOR = process.env.ENVIRONMENT || "dev";
loadEnvFile(
  path.join(PROJECT_ROOT, ENV_FILE_MAP[ENV_SELECTOR] || ".env.development")
);

// 环境配置
const ENV_CONFIGS = {
  dev: {
    name: "development",
    apiBaseUrl:
      process.env.DEV_API_BASEURL || "https://kahe-tapi.85gui7.com/api",
    // 微信小程序测试号 appid（需替换为实际值）
    mpWeixinAppid: process.env.DEV_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    // 支付宝小程序测试号 appid
    mpAlipayAppid: process.env.DEV_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "kahe-blindbox",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.kjkapai.com",
      folder: "tycw-mp",
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
    apiBaseUrl:
      process.env.TEST_API_BASEURL || "https://kahe-tapi.85gui7.com/api",
    mpWeixinAppid: process.env.TEST_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    mpAlipayAppid: process.env.TEST_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "kahe-blindbox",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.kjkapai.com",
      folder: "tycw-mp",
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
    apiBaseUrl:
      process.env.PROD_API_BASEURL || "https://kahe-api.85gui7.com/api",
    mpWeixinAppid: process.env.PROD_MP_WEIXIN_APPID || "wxa59d33960bdab663",
    mpAlipayAppid: process.env.PROD_MP_ALIPAY_APPID || "",
    qiniu: {
      bucket: process.env.QINIU_BUCKET || "kahe-blindbox",
      cdnDomain: process.env.QINIU_CDN_DOMAIN || "https://cdn.kjkapai.com",
      folder: "tycw-mp",
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
    throw new Error(
      `Unknown platform: ${platform}. Expected: mp-weixin, mp-alipay`
    );
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
