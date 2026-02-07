#!/usr/bin/env bash

set -euo pipefail

# 项目根目录
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo ">>> 开始构建 H5"
pnpm build:h5:prod

# uni-app H5 默认输出目录
LOCAL_DIST="${ROOT_DIR}/dist/build/h5"

if [ ! -d "$LOCAL_DIST" ]; then
  echo "构建输出目录不存在：$LOCAL_DIST"
  echo "请确认 uni build 的输出路径是否为 dist/build/h5。"
  exit 1
fi

# 将 public 目录下的文件复制到构建输出目录（覆盖同名文件），确保一起上传
PUBLIC_DIR="${ROOT_DIR}/public"
if [ -d "$PUBLIC_DIR" ]; then
  echo ">>> 复制 public/ 下的文件到构建输出目录"
  cp -R "$PUBLIC_DIR"/. "$LOCAL_DIST/"
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
ARCHIVE_NAME="h5-${TIMESTAMP}.tar.gz"

echo ">>> 打包本地构建结果：${ARCHIVE_NAME}"
# 在 macOS 上禁用扩展属性和资源分叉，避免远程解压时出现
# “LIBARCHIVE.xattr.com.apple.provenance” 之类的提示
# COPYFILE_DISABLE=1 关闭 ._ 文件；--no-xattrs/--no-mac-metadata 禁止写入扩展属性头
COPYFILE_DISABLE=1 tar --no-xattrs --no-mac-metadata -C "$LOCAL_DIST" -czf "$ARCHIVE_NAME" .

# 远程部署配置
REMOTE_HOST="jmcw"
REMOTE_BASE="/var/www"
REMOTE_DIR="app.91tcg.com"
REMOTE_ARCHIVE="${REMOTE_BASE}/${REMOTE_DIR}.tar.gz"

echo ">>> 上传到远程服务器：${REMOTE_HOST}:${REMOTE_ARCHIVE}"
scp "$ARCHIVE_NAME" "${REMOTE_HOST}:${REMOTE_ARCHIVE}"

echo ">>> 远程解压并发布到 ${REMOTE_BASE}/${REMOTE_DIR}"
ssh "$REMOTE_HOST" bash << 'EOF'
set -euo pipefail

REMOTE_BASE="/var/www"
REMOTE_DIR="app.91tcg.com"
REMOTE_ARCHIVE="${REMOTE_BASE}/${REMOTE_DIR}.tar.gz"

mkdir -p "${REMOTE_BASE}/${REMOTE_DIR}"
cd "${REMOTE_BASE}/${REMOTE_DIR}"

echo "清空旧文件..."
rm -rf ./*

echo "解压新版本..."
tar  --no-xattrs -xzf "${REMOTE_ARCHIVE}" -C "${REMOTE_BASE}/${REMOTE_DIR}"

echo "部署完成：\${REMOTE_BASE}/\${REMOTE_DIR}"
EOF

echo ">>> 清理本地临时压缩包"
rm -f "$ARCHIVE_NAME"

echo ">>> H5 构建并部署到 jmcw:/var/www/app.91tcg.com 完成"

