/**
 * CI 结构化日志模块
 * 输出 JSON 格式日志，便于 Jenkins 解析和审计
 */

const { hostname } = require("os");

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const CURRENT_LEVEL = LOG_LEVELS[process.env.CI_LOG_LEVEL || "INFO"] || LOG_LEVELS.INFO;

const BUILD_ID = process.env.BUILD_ID || "local";
const BUILD_NUMBER = process.env.BUILD_NUMBER || "0";
const JOB_NAME = process.env.JOB_NAME || "uniapp-ci";
const STAGE = process.env.CI_STAGE || "unknown";

function log(level, message, meta = {}) {
  const numericLevel = LOG_LEVELS[level] || LOG_LEVELS.INFO;
  if (numericLevel < CURRENT_LEVEL) return;

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    buildId: BUILD_ID,
    buildNumber: BUILD_NUMBER,
    jobName: JOB_NAME,
    stage: STAGE,
    hostname: hostname(),
    message,
    ...meta,
  };

  const output = JSON.stringify(entry);

  if (level === "ERROR") {
    console.error(output);
  } else if (level === "WARN") {
    console.warn(output);
  } else {
    console.log(output);
  }
}

module.exports = {
  debug: (msg, meta) => log("DEBUG", msg, meta),
  info: (msg, meta) => log("INFO", msg, meta),
  warn: (msg, meta) => log("WARN", msg, meta),
  error: (msg, meta) => log("ERROR", msg, meta),
  setStage: (stage) => {
    process.env.CI_STAGE = stage;
  },
  LOG_LEVELS,
};
