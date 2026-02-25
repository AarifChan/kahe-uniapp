#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "=========================================="
echo "Android 离线包一键发布"
echo "流程: 打包 Android UniApp -> 上传 APK -> 刷新 CDN -> 回填 H5 -> 发布 H5 双站点"
echo "=========================================="

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] 未检测到 node，请先安装 Node.js"
  exit 1
fi

print_sign_fingerprint() {
  local apk_glob="${ROOT_DIR}/android/app/build/outputs/apk/release/app-release.apk"
  local keystore_path="${ROOT_DIR}/jmcw.keystore"
  local key_alias="jmcw"
  local store_pass="jmcw2026"

  if ! command -v keytool >/dev/null 2>&1; then
    echo "[WARN] 未检测到 keytool，跳过签名校验输出"
    return
  fi
  if [ ! -f "$apk_glob" ]; then
    echo "[WARN] 未找到 release APK: $apk_glob"
    return
  fi
  if [ ! -f "$keystore_path" ]; then
    echo "[WARN] 未找到 keystore: $keystore_path"
    return
  fi

  echo "[INFO] 输出签名指纹（用于核对微信开放平台，建议以 SHA1 为准）"
  local apk_info
  local key_info
  local apk_sha1
  local apk_sha256
  local key_sha1
  local key_sha256

  apk_info="$(keytool -printcert -jarfile "$apk_glob" 2>/dev/null || true)"
  key_info="$(keytool -list -v -keystore "$keystore_path" -storepass "$store_pass" -alias "$key_alias" 2>/dev/null || true)"

  apk_sha1="$(printf '%s\n' "$apk_info" | awk -F'SHA1: ' '/SHA1:/{print $2; exit}' | tr -d '[:space:]')"
  apk_sha256="$(printf '%s\n' "$apk_info" | awk -F'SHA256: ' '/SHA256:/{print $2; exit}' | tr -d '[:space:]')"
  key_sha1="$(printf '%s\n' "$key_info" | awk -F'SHA1: ' '/SHA1:/{print $2; exit}' | tr -d '[:space:]')"
  key_sha256="$(printf '%s\n' "$key_info" | awk -F'SHA256: ' '/SHA256:/{print $2; exit}' | tr -d '[:space:]')"

  echo "  - APK cert SHA1      : ${apk_sha1:-获取失败}"
  echo "  - Keystore cert SHA1 : ${key_sha1:-获取失败}"
  echo "  - APK cert SHA256    : ${apk_sha256:-获取失败}"
  echo "  - Keystore cert SHA256: ${key_sha256:-获取失败}"

  if [ -n "$apk_sha1" ] && [ -n "$key_sha1" ] && [ "$apk_sha1" != "$key_sha1" ]; then
    echo "[WARN] APK 与 keystore 的 SHA1 不一致，请检查打包签名配置"
  fi

  if [ -n "$apk_sha1" ] && [ -n "$key_sha1" ] && [ "$apk_sha1" = "$key_sha1" ]; then
    echo "[OK] APK 与 keystore 签名一致"
  fi
}

echo "[INFO] 执行发布脚本: uni-kahe/scripts/upload_to_qiniu.js apk"
node "./uni-kahe/scripts/upload_to_qiniu.js" apk

print_sign_fingerprint

echo "[INFO] Android 离线包一键发布完成"
