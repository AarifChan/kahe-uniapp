/**
 * 七牛云客户端封装
 * 特性：重试机制、ETag 去重、内容哈希命名、CDN 刷新
 * 凭证从环境变量读取（Jenkins Credential Store 注入）
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const qiniu = require("qiniu");
const logger = require("./logger");
const {
  SUPPLEMENTAL_ASSET_PATTERN,
  mergeSupplementalEntries,
} = require("./static-upload-entries");

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/** 七牛存储区域：z0 华东 / z1 华北 / z2 华南 / na0 北美 / as0 东南亚 */
const ZONE_MAP = {
  z0: () => qiniu.zone.Zone_z0,
  z1: () => qiniu.zone.Zone_z1,
  z2: () => qiniu.zone.Zone_z2,
  na0: () => qiniu.zone.Zone_na0,
  as0: () => qiniu.zone.Zone_as0,
};

function resolveQiniuZone(zoneId) {
  const key = (zoneId || process.env.QINIU_ZONE || "z0").toLowerCase();
  const factory = ZONE_MAP[key];
  if (!factory) {
    throw new Error(`Unknown Qiniu zone: ${zoneId}. Use z0, z1, z2, na0, or as0.`);
  }
  return factory();
}

class QiniuClient {
  constructor({ accessKey, secretKey, bucket, cdnDomain, folder, zone }) {
    if (!accessKey || !secretKey) {
      throw new Error("Qiniu credentials (accessKey, secretKey) are required. Set via Jenkins Credential Store.");
    }

    this.bucket = bucket;
    this.cdnDomain = cdnDomain.replace(/\/$/, "");
    this.folder = folder ? folder.replace(/\/$/, "") : "";

    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const config = new qiniu.conf.Config();
    config.zone = resolveQiniuZone(zone);
    logger.info(`Qiniu upload zone: ${(zone || process.env.QINIU_ZONE || "z0").toLowerCase()}`, { bucket });
    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
    this.cdnManager = new qiniu.cdn.CdnManager(this.mac);
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, config);

    this.uploadToken = new qiniu.rs.PutPolicy({ scope: bucket }).uploadToken(this.mac);

    // 内存缓存已上传文件的 ETag，减少 API 调用
    this.etagCache = new Map();
  }

  /**
   * 计算文件内容的 ETag（七牛兼容）
   */
  computeEtag(localFile) {
    const stat = fs.statSync(localFile);
    if (stat.size === 0) return "Fto5o-5ea0sNMlW_75VgGJCv2AcJ";

    const blockSize = 4 * 1024 * 1024; // 4MB
    const buffer = fs.readFileSync(localFile);
    const blocks = Math.ceil(buffer.length / blockSize);

    if (blocks === 1) {
      return crypto.createHash("sha1").update(buffer).digest("base64");
    }

    const digests = [];
    for (let i = 0; i < blocks; i++) {
      const chunk = buffer.slice(i * blockSize, Math.min((i + 1) * blockSize, buffer.length));
      digests.push(crypto.createHash("sha1").update(chunk).digest());
    }
    const finalHash = crypto.createHash("sha1").update(Buffer.concat(digests)).digest();
    return Buffer.concat([Buffer.from([0x96]), finalHash]).toString("base64");
  }

  /**
   * 计算文件内容哈希（用于文件名）
   */
  computeContentHash(localFile) {
    return crypto.createHash("md5").update(fs.readFileSync(localFile)).digest("hex").slice(0, 8);
  }

  /**
   * 生成带哈希的 CDN 文件名
   */
  generateKey(localFile, relativePath, options = {}) {
    const preserve =
      options.preserveFileName === true || process.env.QINIU_PRESERVE_FILENAME === "true";
    const normRel = relativePath.replace(/\\/g, "/");

    // 小程序动态路径（如 `/static/.../tag-level${tag}.png`）需保留原文件名
    if (preserve) {
      return this.folder ? `${this.folder}/${normRel}`.replace(/\/+/g, "/") : normRel;
    }

    const hash = this.computeContentHash(localFile);
    const parsed = path.parse(normRel);
    const hashedName = `${parsed.name}.${hash}${parsed.ext}`;
    const dir = parsed.dir && parsed.dir !== "." ? `${parsed.dir}/` : "";
    return this.folder
      ? `${this.folder}/${dir}${hashedName}`.replace(/\/+/g, "/")
      : `${dir}${hashedName}`.replace(/\/+/g, "/");
  }

  /**
   * 检查远程文件是否已存在且内容相同
   */
  async checkExists(key, localEtag) {
    if (this.etagCache.has(key)) {
      return this.etagCache.get(key) === localEtag;
    }

    try {
      const { data } = await new Promise((resolve, reject) => {
        this.bucketManager.stat(this.bucket, key, (err, respBody, respInfo) => {
          if (err) reject(err);
          else resolve({ data: respBody, info: respInfo });
        });
      });

      if (data && data.hash === localEtag) {
        this.etagCache.set(key, localEtag);
        return true;
      }
    } catch (err) {
      // 文件不存在时 stat 会报错，这是正常的
      logger.debug(`File not found on remote: ${key}`);
    }
    return false;
  }

  /**
   * 上传单个文件（带重试）
   */
  async uploadFile(localFile, key) {
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await new Promise((resolve, reject) => {
          this.formUploader.putFile(
            this.uploadToken,
            key,
            localFile,
            this.putExtra,
            (respErr, respBody, respInfo) => {
              if (respErr) reject(respErr);
              else if (respInfo.statusCode !== 200) {
                reject(new Error(`Upload failed: HTTP ${respInfo.statusCode}, ${JSON.stringify(respBody)}`));
              } else {
                resolve(respBody);
              }
            }
          );
        });

        logger.info(`Uploaded: ${key}`, { size: fs.statSync(localFile).size });
        return result;
      } catch (err) {
        lastError = err;
        logger.warn(`Upload attempt ${attempt}/${MAX_RETRIES} failed for ${key}: ${err.message}`);

        if (attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
        }
      }
    }

    throw new Error(`Upload failed after ${MAX_RETRIES} attempts: ${key}, ${lastError.message}`);
  }

  /**
   * 刷新 CDN 缓存
   */
  async refreshCdn(urls) {
    if (!urls || urls.length === 0) return;

    try {
      const result = await new Promise((resolve, reject) => {
        this.cdnManager.refreshUrls(urls, (err, respBody, respInfo) => {
          if (err) reject(err);
          else if (respInfo.statusCode !== 200) {
            reject(new Error(`CDN refresh failed: HTTP ${respInfo.statusCode}`));
          } else {
            resolve(respBody);
          }
        });
      });

      logger.info(`CDN refresh queued: ${urls.length} URLs`);
      return result;
    } catch (err) {
      logger.warn(`CDN refresh failed: ${err.message}`);
      // CDN 刷新失败不阻塞流水线
    }
  }

  /**
   * 批量上传目录
   * @returns {Promise<{manifest: object, uploaded: number, skipped: number, refreshed: string[]}>}
   */
  async uploadDirectory(localDir, options = {}) {
    const manifest = {}; // localPath -> { key, cdnUrl, hash, size }
    let uploaded = 0;
    let skipped = 0;
    const refreshedUrls = [];

    let entries = this.walkDir(localDir);
    let supplemented = 0;

    if (options.supplementDir && fs.existsSync(options.supplementDir)) {
      const supplementEntries = this.walkDir(options.supplementDir);
      const pattern = options.supplementPattern || SUPPLEMENTAL_ASSET_PATTERN;
      const merged = mergeSupplementalEntries(entries, supplementEntries, pattern);
      entries = merged.entries;
      supplemented = merged.supplemented;
      if (supplemented > 0) {
        logger.info(`从补充目录合并 ${supplemented} 个 gif/字体文件`, {
          supplementDir: options.supplementDir,
        });
      }
    }

    for (const { localPath, relativePath } of entries) {
      const key = this.generateKey(localPath, relativePath, options);
      const cdnUrl = `${this.cdnDomain}/${key}`;
      const etag = this.computeEtag(localPath);
      const size = fs.statSync(localPath).size;

      const exists = await this.checkExists(key, etag);

      if (exists) {
        skipped++;
        logger.debug(`Skipped (unchanged): ${key}`);
      } else {
        await this.uploadFile(localPath, key);
        uploaded++;
        refreshedUrls.push(cdnUrl);
      }

      manifest[relativePath] = { key, cdnUrl, hash: etag, size };
    }

    // 刷新 CDN
    if (refreshedUrls.length > 0) {
      await this.refreshCdn(refreshedUrls);
    }

    return { manifest, uploaded, skipped, refreshed: refreshedUrls, supplemented, totalEntries: entries.length };
  }

  walkDir(dir, baseDir = dir, result = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      // 跳过 macOS 元数据等隐藏文件
      if (entry.name.startsWith(".")) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      if (entry.isDirectory()) {
        this.walkDir(fullPath, baseDir, result);
      } else {
        result.push({ localPath: fullPath, relativePath });
      }
    }
    return result;
  }
}

module.exports = QiniuClient;
