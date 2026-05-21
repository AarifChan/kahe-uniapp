/**
 * 扫描源码中动态 static 资源引用（供发布前自查）
 * 用法: node scripts/ci/audit-dynamic-static-paths.js
 */

const fs = require("fs");
const path = require("path");
const { PROJECT_ROOT } = require("./lib/config");

const SRC_DIR = path.join(PROJECT_ROOT, "src");
const SCAN_EXT = new Set([".vue", ".ts", ".js", ".scss", ".css"]);

const PATTERNS = [
  { name: "template-literal", regex: /`\/static\/[^`]*\$\{[^}]+\}[^`]*`/g },
  { name: "string-concat", regex: /['"]\/static\/[^'"]*['"]\s*\+/g },
  { name: "concat-tail", regex: /\+\s*['"][^'"]*\.(png|gif|jpg|jpeg|webp|ttf)['"]/gi },
];

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, files);
    } else if (SCAN_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const rel = path.relative(PROJECT_ROOT, filePath);
  const hits = [];

  for (const { name, regex } of PATTERNS) {
    const matches = content.match(regex);
    if (matches) {
      for (const m of matches) {
        hits.push({ type: name, snippet: m.length > 80 ? `${m.slice(0, 77)}...` : m });
      }
    }
  }

  return hits.length ? { file: rel, hits } : null;
}

function main() {
  const files = walkDir(SRC_DIR);
  const results = files.map(auditFile).filter(Boolean);

  console.log("\n=== DYNAMIC STATIC PATH AUDIT ===");
  console.log(`Scanned: ${files.length} files under src/`);
  console.log(`Dynamic static usages: ${results.length} files\n`);

  for (const { file, hits } of results) {
    console.log(file);
    for (const h of hits) {
      console.log(`  [${h.type}] ${h.snippet}`);
    }
    console.log("");
  }

  console.log("发布时 upload-mp-build-static + replace-cdn-urls 会：");
  console.log("  1. 保留原文件名上传七牛");
  console.log("  2. 将 /static/ 前缀（含模板字符串、字符串拼接）替换为 CDN 根路径");
  console.log("================================\n");
}

main();
