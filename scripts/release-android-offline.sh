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

echo "[INFO] 执行发布脚本: uni-kahe/scripts/upload_to_qiniu.js apk"
node "./uni-kahe/scripts/upload_to_qiniu.js" apk

echo "[INFO] Android 离线包一键发布完成"
