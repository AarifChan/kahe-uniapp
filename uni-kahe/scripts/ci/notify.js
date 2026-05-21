/**
 * 构建通知模块
 * 支持钉钉和企微（WeChat Work）Webhook 通知
 *
 * 环境变量：
 *   DINGTALK_WEBHOOK - 钉钉机器人 Webhook URL（含 access_token）
 *   WECHAT_WORK_WEBHOOK - 企微机器人 Webhook URL（含 key）
 *   BUILD_URL - Jenkins 构建页面 URL
 *   BUILD_NUMBER - Jenkins 构建编号
 *   JOB_NAME - Jenkins 任务名称
 */

const https = require("https");
const { getVersion, getVersionDesc } = require("./lib/config");
const logger = require("./lib/logger");

const COLORS = {
  success: "#52c41a",
  failure: "#ff4d4f",
  warning: "#faad14",
  info: "#1890ff",
};

function sendWebhook(url, payload) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const data = JSON.stringify(payload);

    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    req.write(data);
    req.end();
  });
}

/**
 * 钉钉消息（markdown 格式）
 */
function buildDingTalkPayload({ status, env, platform, version, duration, buildUrl }) {
  const emoji = status === "success" ? "✅" : status === "failure" ? "❌" : "⚠️";
  const color = COLORS[status] || COLORS.info;

  return {
    msgtype: "markdown",
    markdown: {
      title: `${emoji} 小程序构建${status === "success" ? "成功" : "失败"}`,
      text: [
        `### ${emoji} 小程序构建${status === "success" ? "成功" : "失败"}`,
        "",
        `**项目**: ${process.env.JOB_NAME || "uniapp-ci"}`,
        `**环境**: ${env}`,
        `**平台**: ${platform}`,
        `**版本**: ${version}`,
        `**耗时**: ${duration}`,
        `**状态**: <font color="${color}">${status.toUpperCase()}</font>`,
        "",
        buildUrl ? `[查看构建详情](${buildUrl})` : "",
      ].join("\n"),
    },
  };
}

/**
 * 企微消息（markdown 格式）
 */
function buildWechatWorkPayload({ status, env, platform, version, duration, buildUrl }) {
  const emoji = status === "success" ? "✅" : status === "failure" ? "❌" : "⚠️";

  return {
    msgtype: "markdown",
    markdown: {
      content: [
        `## ${emoji} 小程序构建${status === "success" ? "成功" : "失败"}`,
        "",
        `**项目**: ${process.env.JOB_NAME || "uniapp-ci"}`,
        `**环境**: ${env}`,
        `**平台**: ${platform}`,
        `**版本**: ${version}`,
        `**耗时**: ${duration}`,
        `**状态**: ${status.toUpperCase()}`,
        "",
        buildUrl ? `[查看构建详情](${buildUrl})` : "",
      ].join("\n"),
    },
  };
}

async function notify({ status, duration = "unknown" }) {
  const env = process.env.ENVIRONMENT || "dev";
  const platform = process.env.PLATFORM || "mp-weixin";
  const version = getVersion();
  const buildUrl = process.env.BUILD_URL || "";

  logger.setStage("notify");
  logger.info(`Sending ${status} notification`, { env, platform, version });

  const dingtalkWebhook = process.env.DINGTALK_WEBHOOK;
  const wechatWorkWebhook = process.env.WECHAT_WORK_WEBHOOK;

  const errors = [];

  if (dingtalkWebhook) {
    try {
      const payload = buildDingTalkPayload({ status, env, platform, version, duration, buildUrl });
      await sendWebhook(dingtalkWebhook, payload);
      logger.info("DingTalk notification sent");
    } catch (err) {
      errors.push(`DingTalk: ${err.message}`);
      logger.warn(`DingTalk notification failed: ${err.message}`);
    }
  }

  if (wechatWorkWebhook) {
    try {
      const payload = buildWechatWorkPayload({ status, env, platform, version, duration, buildUrl });
      await sendWebhook(wechatWorkWebhook, payload);
      logger.info("WeChat Work notification sent");
    } catch (err) {
      errors.push(`WeChat Work: ${err.message}`);
      logger.warn(`WeChat Work notification failed: ${err.message}`);
    }
  }

  if (!dingtalkWebhook && !wechatWorkWebhook) {
    logger.warn("No notification webhook configured. Set DINGTALK_WEBHOOK or WECHAT_WORK_WEBHOOK.");
  }

  if (errors.length > 0) {
    // 通知失败不阻塞流水线
    console.log("\n=== NOTIFICATION WARNINGS ===");
    for (const e of errors) {
      console.log(`  - ${e}`);
    }
    console.log("==============================\n");
  }
}

// CLI 入口
async function main() {
  const status = process.argv[2]; // success | failure
  const duration = process.argv[3] || "unknown";

  if (!status) {
    console.error("Usage: node notify.js <success|failure> [duration]");
    process.exit(1);
  }

  await notify({ status, duration });
}

main().catch((err) => {
  logger.error("Notification error", { error: err.message });
  process.exit(1);
});
