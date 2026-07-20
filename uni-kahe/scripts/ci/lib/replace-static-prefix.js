/**
 * 将代码中剩余的 /static/ 前缀替换为 CDN 根路径
 * 覆盖：模板字符串、字符串拼接、url()、background-image、压缩转义引号等
 */

/**
 * @param {string} cdnDomain
 * @param {string} [folder]
 * @returns {string} 例如 https://cdn.kjkapai.com/tycw-mp/
 */
function buildCdnStaticPrefix(cdnDomain, folder) {
  const domain = (cdnDomain || "").replace(/\/$/, "");
  const dir = folder ? folder.replace(/^\/|\/$/g, "") : "";
  return dir ? `${domain}/${dir}/` : `${domain}/`;
}

/**
 * @param {string} content
 * @param {string} cdnPrefix
 * @returns {{ content: string, count: number }}
 */
function replaceRemainingStaticPrefixes(content, cdnPrefix) {
  if (!cdnPrefix || !content.includes("static")) {
    return { content, count: 0 };
  }

  let modified = content;
  let count = 0;

  const rules = [
    { regex: /`\/static\//g, replacement: `\`${cdnPrefix}` },
    { regex: /"\/static\//g, replacement: `"${cdnPrefix}` },
    { regex: /'\/static\//g, replacement: `'${cdnPrefix}` },
    { regex: /\\"\/static\//g, replacement: `\\"${cdnPrefix}` },
    { regex: /\\'\/static\//g, replacement: `\\'${cdnPrefix}` },
    { regex: /url\(\/static\//g, replacement: `url(${cdnPrefix}` },
    { regex: /url\("\/static\//g, replacement: `url("${cdnPrefix}` },
    { regex: /url\('\/static\//g, replacement: `url('${cdnPrefix}` },
    { regex: /url\(static\//g, replacement: `url(${cdnPrefix}` },
    { regex: /url\("static\//g, replacement: `url("${cdnPrefix}` },
    { regex: /url\('static\//g, replacement: `url('${cdnPrefix}` },
    {
      regex: /background-image:\s*url\("\/static\//g,
      replacement: `background-image: url("${cdnPrefix}`,
    },
    {
      regex: /background-image:\s*url\('\/static\//g,
      replacement: `background-image: url('${cdnPrefix}`,
    },
    {
      regex: /background-image:\s*url\(\/static\//g,
      replacement: `background-image: url(${cdnPrefix}`,
    },
  ];

  for (const { regex, replacement } of rules) {
    const matches = modified.match(regex);
    if (matches) {
      modified = modified.replace(regex, replacement);
      count += matches.length;
    }
  }

  // 兜底：替换仍残留的 /static/（精确 manifest 替换后通常只剩动态路径）
  const remaining = modified.match(/\/static\//g);
  if (remaining) {
    modified = modified.replace(/\/static\//g, cdnPrefix);
    count += remaining.length;
  }

  return { content: modified, count };
}

module.exports = {
  buildCdnStaticPrefix,
  replaceRemainingStaticPrefixes,
};
