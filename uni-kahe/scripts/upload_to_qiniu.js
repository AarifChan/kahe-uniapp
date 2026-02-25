const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");
const qiniu = require("qiniu");

// 七牛云配置
const accessKey = "5UjmGRCWvjvVLFwrjXOA35GJ2CnqXv-HJHPGxzHL";
const secretKey = "_Fr6qdmLWIn9tknGE_DQoep9h_oECiXaKaH-E50X";
const bucket = "jm-blindbox";
const cdnDomain = "https://jms.85gui7.com";

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();
const cdnManager = new qiniu.cdn.CdnManager(mac);
const folderName = "kahe-202510";

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const ANDROID_DIR = path.join(PROJECT_ROOT, "android");
const H5_INDEX_FILE = path.join(PROJECT_ROOT, "h5/src/pages/index/index.vue");
const H5_DIR = path.join(PROJECT_ROOT, "h5");

const options = { scope: bucket };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed: ${code}`));
    });
    child.on("error", reject);
  });
}

function uploadFile(localFile, key) {
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      localFile,
      putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
          return;
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
          return;
        }
        reject(respBody);
      }
    );
  });
}

function refreshCdnUrls(urls) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(urls) || urls.length === 0) {
      resolve();
      return;
    }
    cdnManager.refreshUrls(urls, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr);
        return;
      }
      if (respInfo && respInfo.statusCode >= 200 && respInfo.statusCode < 300) {
        resolve(respBody);
        return;
      }
      reject(new Error(`刷新 CDN 失败: ${JSON.stringify(respBody)}`));
    });
  });
}

function nowTag() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function getLatestReleaseApk() {
  const releaseDir = path.join(ANDROID_DIR, "app/build/outputs/apk/release");
  const files = await fsp.readdir(releaseDir);
  const apkFiles = files.filter((name) => name.endsWith(".apk"));
  if (apkFiles.length === 0) {
    throw new Error(`未找到 APK 文件: ${releaseDir}`);
  }
  const withStat = await Promise.all(
    apkFiles.map(async (name) => {
      const abs = path.join(releaseDir, name);
      const stat = await fsp.stat(abs);
      return { abs, mtimeMs: stat.mtimeMs };
    })
  );
  withStat.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return withStat[0].abs;
}

async function updateAndroidDownloadUrlInH5(url) {
  const original = await fsp.readFile(H5_INDEX_FILE, "utf8");
  const pattern = /const ANDROID_APK_URL = ['"][^'"]*['"]/;
  if (!pattern.test(original)) {
    throw new Error(`未在 ${H5_INDEX_FILE} 找到 ANDROID_APK_URL 常量，请先接入页面常量`);
  }
  const updated = original.replace(pattern, `const ANDROID_APK_URL = '${url}'`);
  await fsp.writeFile(H5_INDEX_FILE, updated, "utf8");
}

async function deployH5ToBothSites() {
  const deployScript = "./scripts/deploy-h5.sh";
  console.log(">>> 发布 H5 到 m.85gui7.com");
  await runCommand("bash", [deployScript, "m"], H5_DIR);
  console.log(">>> 发布 H5 到 app.91tcg.com");
  await runCommand("bash", [deployScript, "app"], H5_DIR);
}

async function buildAndPublishAndroidApk() {
  console.log("\n[1/4] 编译 UniApp 离线资源...");
  await runCommand("bash", ["./scripts/build-android.sh"], PROJECT_ROOT);

  console.log("\n[2/4] 组装 Android Release APK...");
  const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
  await runCommand(gradlew, [":app:assembleRelease"], ANDROID_DIR);

  console.log("\n[3/5] 上传 APK 到七牛...");
  const apkPath = await getLatestReleaseApk();
  const apkKey = `apk/kahe-android-${nowTag()}.apk`;
  await uploadFile(apkPath, apkKey);
  const apkUrl = `${cdnDomain}/${apkKey}`;
  console.log(`[OK] APK 上传成功: ${apkUrl}`);

  console.log("\n[4/5] 强制刷新七牛 CDN 缓存...");
  await refreshCdnUrls([apkUrl]);
  console.log("[OK] CDN 缓存刷新成功");

  console.log("\n[5/6] 回填 H5 安卓下载地址...");
  await updateAndroidDownloadUrlInH5(apkUrl);
  console.log(`[OK] 已更新: ${H5_INDEX_FILE}`);

  console.log("\n[6/6] 发布 H5 到 m.85gui7.com 和 app.91tcg.com...");
  await deployH5ToBothSites();
  console.log("[OK] H5 双站点发布完成");

  console.log(`\n发布完成，安卓下载地址: ${apkUrl}\n`);
}

function traverseDirectory(dir, prefix = "") {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error("Error stating file:", statErr);
          return;
        }
        if (stats.isFile()) {
          const extname = path.extname(file).toLowerCase();
          if ([".png", ".jpg", ".jpeg", ".gif"].includes(extname)) {
            const key = prefix ? `${prefix}/${file}` : file;
            uploadFile(filePath, key)
              .then((respBody) => {
                console.log("Upload successful:", respBody.key);
              })
              .catch((error) => {
                console.error("Upload failed:", error);
              });
          }
        } else if (stats.isDirectory()) {
          const subPrefix = prefix ? `${prefix}/${file}` : file;
          traverseDirectory(filePath, subPrefix);
        }
      });
    });
  });
}

async function main() {
  const mode = (process.argv[2] || "apk").toLowerCase();
  if (mode === "apk") {
    await buildAndPublishAndroidApk();
    return;
  }
  if (mode === "images") {
    console.log("开始上传 static 图片到七牛...");
    traverseDirectory(path.resolve(__dirname, "../src/static"), folderName);
    return;
  }
  console.log("用法:");
  console.log("  node ./scripts/upload_to_qiniu.js apk     # 一键打包 Android 离线 UniApp + 上传 APK + 回填 H5 下载地址");
  console.log("  node ./scripts/upload_to_qiniu.js images  # 上传 static 图片到七牛");
}

main().catch((err) => {
  console.error("[ERROR]", err.message || err);
  process.exit(1);
});
