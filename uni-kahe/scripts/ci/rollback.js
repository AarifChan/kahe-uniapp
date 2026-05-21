/**
 * 回滚脚本
 * 流程：
 * 1. 从 Jenkins 归档目录或备份目录找到上一版本的产物
 * 2. 验证产物完整性（checksum）
 * 3. 重新上传到小程序平台
 * 4. 发送回滚通知
 *
 * 环境变量：
 *   ROLLBACK_VERSION - 要回滚到的版本号（可选，默认上一个版本）
 *   ARTIFACT_DIR - 产物归档目录（默认 dist/artifacts/）
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { PROJECT_ROOT, getConfig } = require("./lib/config");
const logger = require("./lib/logger");

const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(PROJECT_ROOT, "dist", "artifacts");

function findArtifacts() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    throw new Error(`Artifact directory not found: ${ARTIFACT_DIR}`);
  }

  const entries = fs.readdirSync(ARTIFACT_DIR)
    .filter((f) => f.endsWith(".tar.gz"))
    .map((f) => {
      const fullPath = path.join(ARTIFACT_DIR, f);
      const stat = fs.statSync(fullPath);
      return {
        file: f,
        path: fullPath,
        mtime: stat.mtime,
        size: stat.size,
      };
    })
    .sort((a, b) => b.mtime - a.mtime);

  return entries;
}

function verifyArtifact(artifactPath) {
  // 检查 checksum 文件
  const checksumPath = `${artifactPath}.sha256`;
  if (!fs.existsSync(checksumPath)) {
    logger.warn("Checksum file not found, skipping verification");
    return true;
  }

  const expected = fs.readFileSync(checksumPath, "utf-8").trim().split(" ")[0];
  const actual = execSync(`sha256sum "${artifactPath}"`, { encoding: "utf-8" })
    .trim()
    .split(" ")[0];

  if (expected !== actual) {
    throw new Error(`Checksum mismatch for ${artifactPath}`);
  }

  logger.info("Artifact checksum verified");
  return true;
}

function extractArtifact(artifactPath, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  execSync(`tar -xzf "${artifactPath}" -C "${targetDir}"`, { stdio: "inherit" });
  logger.info(`Artifact extracted to ${targetDir}`);
}

async function main() {
  const env = process.env.ENVIRONMENT || "prod";
  const platform = process.env.PLATFORM || "mp-weixin";
  const targetVersion = process.env.ROLLBACK_VERSION;

  logger.setStage("rollback");
  logger.info("Starting rollback...", { env, platform, targetVersion: targetVersion || "latest" });

  const artifacts = findArtifacts();
  if (artifacts.length === 0) {
    throw new Error("No artifacts found for rollback");
  }

  // 选择要回滚的版本
  let selected;
  if (targetVersion) {
    selected = artifacts.find((a) => a.file.includes(targetVersion));
    if (!selected) {
      throw new Error(`Artifact for version ${targetVersion} not found`);
    }
  } else {
    selected = artifacts[0]; // 最新的（当前版本的产物在上传后已归档）
    // 实际上要回滚到上一个，所以取第二个
    if (artifacts.length > 1) {
      selected = artifacts[1];
    }
  }

  logger.info(`Selected artifact: ${selected.file}`, {
    size: selected.size,
    modified: selected.mtime,
  });

  // 验证并解压
  verifyArtifact(selected.path);

  const extractDir = path.join(PROJECT_ROOT, "dist", "rollback");
  if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true });
  }
  extractArtifact(selected.path, extractDir);

  // 读取产物元数据
  const metadataPath = path.join(extractDir, "build-metadata.json");
  let metadata = {};
  if (fs.existsSync(metadataPath)) {
    metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  }

  // 重新上传到小程序平台
  logger.info("Re-uploading rolled-back version...");
  const buildDir = path.join(extractDir, "build", platform);

  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory not found in artifact: ${buildDir}`);
  }

  // 使用 upload-miniprogram.js 上传
  process.env.CI_BUILD_DIR = buildDir;
  require("./upload-miniprogram");

  logger.info("Rollback completed", {
    version: metadata.version || "unknown",
    commit: metadata.gitCommit || "unknown",
  });

  console.log("\n=== ROLLBACK COMPLETE ===");
  console.log(`Version: ${metadata.version || "unknown"}`);
  console.log(`Commit: ${metadata.gitCommit || "unknown"}`);
  console.log(`Artifact: ${selected.file}`);
  console.log("=========================\n");
}

main().catch((err) => {
  logger.error("Rollback failed", { error: err.message, stack: err.stack });
  process.exit(1);
});
