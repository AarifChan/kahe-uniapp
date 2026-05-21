/**
 * 构建产物归档
 * 将 dist/build/ + asset-manifest.json + build-metadata.json 打包为版本化 tarball
 * 供后续回滚使用
 *
 * 环境变量：
 *   ARTIFACT_DIR - 归档目录（默认 dist/artifacts/）
 *   BUILD_NUMBER - Jenkins 构建编号
 *   GIT_COMMIT - Git commit hash
 *   GIT_BRANCH - Git 分支名
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { PROJECT_ROOT, getVersion } = require("./lib/config");
const logger = require("./lib/logger");

const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(PROJECT_ROOT, "dist", "artifacts");

function generateChecksum(filePath) {
  const hash = execSync(`sha256sum "${filePath}"`, { encoding: "utf-8" }).trim().split(" ")[0];
  fs.writeFileSync(`${filePath}.sha256`, `${hash}  ${path.basename(filePath)}\n`);
  return hash;
}

function cleanupOldArtifacts(maxKeep = 10) {
  if (!fs.existsSync(ARTIFACT_DIR)) return;

  const entries = fs
    .readdirSync(ARTIFACT_DIR)
    .filter((f) => f.endsWith(".tar.gz"))
    .map((f) => ({
      file: f,
      path: path.join(ARTIFACT_DIR, f),
      mtime: fs.statSync(path.join(ARTIFACT_DIR, f)).mtime,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  // 保留最近的 N 个
  const toDelete = entries.slice(maxKeep);
  for (const entry of toDelete) {
    fs.unlinkSync(entry.path);
    if (fs.existsSync(`${entry.path}.sha256`)) {
      fs.unlinkSync(`${entry.path}.sha256`);
    }
    logger.info(`Cleaned old artifact: ${entry.file}`);
  }
}

async function main() {
  const env = process.env.ENVIRONMENT || "dev";
  const platform = process.env.PLATFORM || "mp-weixin";
  const version = getVersion();
  const buildNumber = process.env.BUILD_NUMBER || "0";
  const gitCommit = (process.env.GIT_COMMIT || "unknown").slice(0, 7);
  const gitBranch = process.env.GIT_BRANCH || "unknown";

  logger.setStage("archive-artifact");

  const buildDir = path.join(PROJECT_ROOT, "dist", "build");
  const manifestPath = path.join(PROJECT_ROOT, "dist", "asset-manifest.json");
  const reportPath = path.join(PROJECT_ROOT, "dist", "package-report.json");

  if (!fs.existsSync(buildDir)) {
    logger.error(`Build directory not found: ${buildDir}`);
    process.exit(1);
  }

  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  // 构建元数据
  const metadata = {
    version,
    buildNumber,
    environment: env,
    platform,
    gitCommit,
    gitBranch,
    timestamp: new Date().toISOString(),
    builtBy: process.env.BUILD_USER || "jenkins",
  };

  const metadataPath = path.join(PROJECT_ROOT, "dist", "build-metadata.json");
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  // 打包
  const artifactName = `uniapp-${env}-${platform}-v${version}-b${buildNumber}.tar.gz`;
  const artifactPath = path.join(ARTIFACT_DIR, artifactName);

  // 创建临时清单文件用于 tar
  const filesToInclude = ["build/", "build-metadata.json"];
  if (fs.existsSync(manifestPath)) filesToInclude.push("asset-manifest.json");
  if (fs.existsSync(reportPath)) filesToInclude.push("package-report.json");

  const tarCmd = [
    "tar",
    "-czf",
    `"${artifactPath}"`,
    "-C",
    `"${path.join(PROJECT_ROOT, "dist")}"`,
    ...filesToInclude,
  ].join(" ");

  execSync(tarCmd, { stdio: "inherit" });

  // 生成 checksum
  const checksum = generateChecksum(artifactPath);

  // 清理旧产物
  cleanupOldArtifacts(10);

  const artifactSize = fs.statSync(artifactPath).size;

  logger.info("Artifact archived", {
    artifactName,
    artifactPath,
    size: artifactSize,
    checksum,
  });

  console.log("\n=== ARTIFACT ARCHIVED ===");
  console.log(`File: ${artifactName}`);
  console.log(`Path: ${artifactPath}`);
  console.log(`Size: ${(artifactSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`SHA256: ${checksum}`);
  console.log("=========================\n");
}

main().catch((err) => {
  logger.error("Artifact archiving failed", { error: err.message });
  process.exit(1);
});
