#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

LOCAL_DIST="${ROOT_DIR}/dist/build/h5"
PUBLIC_DIR="${ROOT_DIR}/public"

REMOTE_HOST="jmcw"
REMOTE_BASE="/var/www"

DEFAULT_TARGET="app.91tcg.com"
TARGET_INPUT="${1:-$DEFAULT_TARGET}"

case "$TARGET_INPUT" in
  app|app.91tcg.com)
    REMOTE_DIR="app.91tcg.com"
    ;;
  m|m.85gui7.com)
    REMOTE_DIR="m.85gui7.com"
    ;;
  *)
    echo "用法: $0 [app|m|app.91tcg.com|m.85gui7.com]"
    echo "示例:"
    echo "  $0                  # 部署到 /var/www/app.91tcg.com"
    echo "  $0 m                # 部署到 /var/www/m.85gui7.com"
    exit 1
    ;;
esac

REMOTE_ARCHIVE="${REMOTE_BASE}/${REMOTE_DIR}.tar.gz"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
ARCHIVE_NAME="h5-${REMOTE_DIR}-${TIMESTAMP}.tar.gz"

echo ">>> 开始构建 H5"
pnpm build:h5:prod

if [ ! -d "$LOCAL_DIST" ]; then
  echo "构建输出目录不存在：$LOCAL_DIST"
  echo "请确认 uni build 的输出路径是否为 dist/build/h5。"
  exit 1
fi

if [ -d "$PUBLIC_DIR" ]; then
  echo ">>> 复制 public/ 到构建输出目录"
  cp -R "$PUBLIC_DIR"/. "$LOCAL_DIST/"
fi

echo ">>> 打包本地构建结果：${ARCHIVE_NAME}"
COPYFILE_DISABLE=1 tar --no-xattrs --no-mac-metadata -C "$LOCAL_DIST" -czf "$ARCHIVE_NAME" .

echo ">>> 上传到远程服务器：${REMOTE_HOST}:${REMOTE_ARCHIVE}"
scp "$ARCHIVE_NAME" "${REMOTE_HOST}:${REMOTE_ARCHIVE}"

echo ">>> 远程解压并发布到 ${REMOTE_BASE}/${REMOTE_DIR}"
ssh "$REMOTE_HOST" "set -euo pipefail; \
  mkdir -p '${REMOTE_BASE}/${REMOTE_DIR}'; \
  rm -rf '${REMOTE_BASE}/${REMOTE_DIR}'/*; \
  tar --no-xattrs -xzf '${REMOTE_ARCHIVE}' -C '${REMOTE_BASE}/${REMOTE_DIR}'; \
  echo '部署完成：${REMOTE_BASE}/${REMOTE_DIR}'"

echo ">>> 清理本地临时压缩包"
rm -f "$ARCHIVE_NAME"

echo ">>> H5 构建并部署完成：${REMOTE_HOST}:${REMOTE_BASE}/${REMOTE_DIR}"

