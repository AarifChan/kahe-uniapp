#!/bin/bash

###############################################################################
# 通用微信小程序 CI 上传脚本
#
# 功能：
# 1. 输入一个 private.wx******.key 文件路径
# 2. 自动解析 appid（从文件名中提取 wx******）
# 3. 在本地生成对应的 upload_wx******.js
# 4. 将 js + key 打包为 tar.gz
# 5. 通过 scp 上传到远程指定目录
# 6. 在远程解压，并用 node 执行 upload_wx******.js 完成上传
#
# 使用示例（第二个参数指定环境：2 / 3 / 默认）：
#   chmod +x ./auto_wx_upload.sh
#   ./auto_wx_upload.sh /path/to/private.wxc995b6ddbd06099b.key 2
#   ./auto_wx_upload.sh /path/to/private.wxc995b6ddbd06099b.key 3
#   ./auto_wx_upload.sh /path/to/private.wxc995b6ddbd06099b.key       # 不写就是默认 wx_ma
#
###############################################################################

set -euo pipefail

#####################################
# 可配置区域
#####################################

# 远程 SSH 主机（可以是别名，也可以是 user@host）
REMOTE_HOST="jmcw"

# 三个固定远程路径
REMOTE_PATH_WX_MA_2="/home/aarif/jmcw/wx_ma_2"
REMOTE_PATH_WX_MA_3="/home/aarif/jmcw/wx_ma_3"
REMOTE_PATH_WX_MA="/home/aarif/jmcw/wx_ma"

# 本地上传脚本与 key 文件统一放置的目录（相对于当前脚本所在目录）
LOCAL_UPLOAD_DIR_NAME="wx_upload"

# 小程序项目构建后目录（相对于远程执行目录）
# 这里保持与你现有的 upload_wx*.js 一致
PROJECT_PATH="../dist/build/mp-weixin"

# 上传版本和描述，可按需修改
UPLOAD_VERSION="1.0.0"
UPLOAD_DESC="自动上传：修复已知问题"

#####################################
# 参数校验
#####################################

if [[ $# -lt 1 ]]; then
  echo "用法：$0 /path/to/private.wx******.key [2|3|default]"
  exit 1
fi

PRIVATE_KEY_PATH="$1"
ENV_FLAG="${2:-default}"   # 选择 wx_ma_2 / wx_ma_3 / wx_ma

if [[ ! -f "$PRIVATE_KEY_PATH" ]]; then
  echo "错误：找不到 key 文件：$PRIVATE_KEY_PATH"
  exit 1
fi

#####################################
# 解析 APPID
#####################################

KEY_BASENAME="$(basename "$PRIVATE_KEY_PATH")"

# 期望文件名格式类似：private.wxc995b6ddbd06099b.key
# 提取中间的 appid：wxc995b6ddbd06099b
if [[ "$KEY_BASENAME" != private.wx*.key ]]; then
  echo "错误：key 文件名格式不正确，期望：private.wx******.key，当前：$KEY_BASENAME"
  exit 1
fi

APPID="${KEY_BASENAME#private.}"  # 去掉前缀 private.
APPID="${APPID%.key}"            # 去掉后缀 .key

echo "解析到 APPID：$APPID"

#####################################
# 目录准备
#####################################

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOCAL_UPLOAD_DIR="${SCRIPT_DIR}/${LOCAL_UPLOAD_DIR_NAME}"

mkdir -p "$LOCAL_UPLOAD_DIR"

UPLOAD_JS_NAME="upload_${APPID}.js"
UPLOAD_JS_PATH="${LOCAL_UPLOAD_DIR}/${UPLOAD_JS_NAME}"
LOCAL_KEY_PATH="${LOCAL_UPLOAD_DIR}/${KEY_BASENAME}"

#####################################
# 复制 key 文件到统一目录
#####################################

cp "$PRIVATE_KEY_PATH" "$LOCAL_KEY_PATH"
echo "已复制 key 到：$LOCAL_KEY_PATH"

#####################################
# 生成 upload_wx******.js
#####################################

cat > "$UPLOAD_JS_PATH" <<EOF
const ci = require('miniprogram-ci');
(async () => {
    const project = new ci.Project({
        appid: '${APPID}',
        type: 'miniProgram',
        projectPath: '${PROJECT_PATH}',
        privateKeyPath: './${KEY_BASENAME}',
        ignores: ['node_modules/**/*']
    })

    const uploadResult = await ci.upload({
        project,
        version: '${UPLOAD_VERSION}',
        desc: '${UPLOAD_DESC}',
        setting: {
            es6: true,
            es7: true,
            disableUseStrict: true,
            autoPrefixWXSS: true,
            minifyJS: true,
            minifyWXSS: true,
            minifyWXML: true
        }
    })
    console.log(uploadResult)
})()
EOF

echo "已生成上传脚本：$UPLOAD_JS_PATH"

#####################################
# 打包（本地）
#####################################

TARBALL_NAME="${APPID}_upload.tar.gz"
TARBALL_PATH="${LOCAL_UPLOAD_DIR}/${TARBALL_NAME}"

tar -czf "$TARBALL_PATH" -C "$LOCAL_UPLOAD_DIR" "$UPLOAD_JS_NAME" "$KEY_BASENAME"
echo "已生成压缩包：$TARBALL_PATH"

#####################################
# 上传到远程并执行
#####################################

# 选择远程目标路径：
#   - 2 / wx_ma_2 -> /home/aarif/jmcw/wx_ma_2
#   - 3 / wx_ma_3 -> /home/aarif/jmcw/wx_ma_3
#   - default / wx_ma -> /home/aarif/jmcw/wx_ma
#   - 以 / 开头的路径 -> 直接使用该路径（支持自定义 plat）
if [[ "$ENV_FLAG" == /* ]]; then
  # 直接传入的是远程路径
  REMOTE_DIR="$ENV_FLAG"
else
  case "$ENV_FLAG" in
    2|"wx_ma_2")
      REMOTE_DIR="$REMOTE_PATH_WX_MA_2"
      ;;
    3|"wx_ma_3")
      REMOTE_DIR="$REMOTE_PATH_WX_MA_3"
      ;;
    *|"wx_ma"|"default")
      REMOTE_DIR="$REMOTE_PATH_WX_MA"
      ;;
  esac
fi

echo "远程目录：${REMOTE_DIR}"

echo "通过 scp 上传压缩包到远程..."
scp "$TARBALL_PATH" "${REMOTE_HOST}:${REMOTE_DIR}/"

echo "在远程解压到 ${APPID} 子目录，并删除压缩包 ..."
ssh "$REMOTE_HOST" "
  set -euo pipefail;
  cd '${REMOTE_DIR}' && \
  mkdir -p '${APPID}' && \
  tar --warning=no-unknown-keyword -xzf '${TARBALL_NAME}' -C '${APPID}' && \
  rm -f '${TARBALL_NAME}'
"
# 如需在远程执行上传脚本，可取消下面这一行的注释：
# ssh "$REMOTE_HOST" \"cd '${REMOTE_DIR}/${APPID}' && node '${UPLOAD_JS_NAME}'\"
echo "全部流程完成。"

