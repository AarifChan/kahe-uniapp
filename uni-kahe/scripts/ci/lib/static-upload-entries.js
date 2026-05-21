/**
 * 小程序 static 上传文件收集：构建产物 + 源目录补充（gif/字体）
 */

const path = require("path");

/** 从 src/static 补充的路径（构建产物中缺失时） */
const SUPPLEMENTAL_ASSET_PATTERN = /\.(gif|ttf|otf|woff2?|eot)$/i;

function normalizeRelativePath(relativePath) {
  return relativePath.split(path.sep).join("/");
}

/**
 * 合并主目录与补充目录的上传列表（同相对路径以主目录为准）
 * @param {Array<{localPath: string, relativePath: string}>} primaryEntries
 * @param {Array<{localPath: string, relativePath: string}>} supplementEntries
 * @param {RegExp} [pattern]
 */
function mergeSupplementalEntries(primaryEntries, supplementEntries, pattern = SUPPLEMENTAL_ASSET_PATTERN) {
  const seen = new Set(primaryEntries.map((e) => normalizeRelativePath(e.relativePath)));
  const merged = [...primaryEntries];
  let supplemented = 0;

  for (const entry of supplementEntries) {
    const rel = normalizeRelativePath(entry.relativePath);
    if (!pattern.test(rel)) continue;
    if (seen.has(rel)) continue;
    merged.push({ ...entry, relativePath: rel, fromSupplement: true });
    seen.add(rel);
    supplemented++;
  }

  return { entries: merged, supplemented };
}

/**
 * @param {Array<{relativePath: string}>} entries
 */
function summarizeAssetTypes(entries) {
  const summary = { png: 0, jpg: 0, gif: 0, font: 0, other: 0 };
  for (const { relativePath } of entries) {
    const ext = path.extname(relativePath).toLowerCase();
    if (ext === ".png") summary.png++;
    else if (ext === ".jpg" || ext === ".jpeg") summary.jpg++;
    else if (ext === ".gif") summary.gif++;
    else if (/\.(ttf|otf|woff2?|eot)$/.test(ext)) summary.font++;
    else summary.other++;
  }
  return summary;
}

module.exports = {
  SUPPLEMENTAL_ASSET_PATTERN,
  normalizeRelativePath,
  mergeSupplementalEntries,
  summarizeAssetTypes,
};
