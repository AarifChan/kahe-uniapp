#!/bin/bash
#
# 修复 Android 项目配置脚本
# 确保所有必要文件和配置正确
#

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 配置
PROJECT_ROOT="/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp"
ANDROID_DIR="${PROJECT_ROOT}/android"
SDK_DIR="/Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128"
APP_ID="__UNI__2BE2CDB"
APP_KEY="bb8cbc87d252fb0887a22e0c65d9d296"
DEMO_WWW="${SDK_DIR}/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www"

cd "${ANDROID_DIR}"

log_info "开始修复 Android 项目配置..."

# 1. 检查并修复 app/src/main/assets/apps/__UNI__2BE2CDB/www 目录
WWW_DIR="app/src/main/assets/apps/${APP_ID}/www"

if [ -d "${WWW_DIR}" ]; then
    log_info "检查必要文件..."
    
    # 检查并复制 __uniappes6.js
    if [ ! -f "${WWW_DIR}/__uniappes6.js" ]; then
        if [ -f "${DEMO_WWW}/__uniappes6.js" ]; then
            log_info "复制 __uniappes6.js..."
            cp "${DEMO_WWW}/__uniappes6.js" "${WWW_DIR}/"
        else
            log_error "无法找到 __uniappes6.js，请检查 SDK 路径"
            exit 1
        fi
    fi
    
    # 检查并复制 app-view.js
    if [ ! -f "${WWW_DIR}/app-view.js" ]; then
        if [ -f "${DEMO_WWW}/app-view.js" ]; then
            log_info "复制 app-view.js..."
            cp "${DEMO_WWW}/app-view.js" "${WWW_DIR}/"
        else
            log_error "无法找到 app-view.js，请检查 SDK 路径"
            exit 1
        fi
    fi
    
    # 检查并修复 __uniappview.html
    if [ -f "${WWW_DIR}/__uniappview.html" ]; then
        # 检查是否包含必要的脚本引用
        if ! grep -q "__uniappes6.js" "${WWW_DIR}/__uniappview.html"; then
            log_info "修复 __uniappview.html..."
            cp "${DEMO_WWW}/__uniappview.html" "${WWW_DIR}/"
        fi
    else
        log_info "创建 __uniappview.html..."
        cp "${DEMO_WWW}/__uniappview.html" "${WWW_DIR}/"
    fi
    
    # 创建 view.css（如果不存在）
    if [ ! -f "${WWW_DIR}/view.css" ] && [ -f "${WWW_DIR}/app.css" ]; then
        log_info "创建 view.css..."
        cp "${WWW_DIR}/app.css" "${WWW_DIR}/view.css"
    fi
    
    # 创建 view.umd.min.js（如果不存在）
    if [ ! -f "${WWW_DIR}/view.umd.min.js" ] && [ -f "${WWW_DIR}/uni-app-view.umd.js" ]; then
        log_info "创建 view.umd.min.js..."
        cp "${WWW_DIR}/uni-app-view.umd.js" "${WWW_DIR}/view.umd.min.js"
    fi
fi

# 2. 修复 dcloud_control.xml
log_info "修复 dcloud_control.xml..."
mkdir -p app/src/main/assets/data
cat > app/src/main/assets/data/dcloud_control.xml << EOF
<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.81635">
<apps>
    <app appid="${APP_ID}" appver="1.0.0"/>
</apps>
</hbuilder>
EOF

# 3. 删除多余的 control.xml（如果有）
if [ -f "app/src/main/assets/apps/${APP_ID}/control.xml" ]; then
    log_info "删除多余的 control.xml..."
    rm -f "app/src/main/assets/apps/${APP_ID}/control.xml"
fi

# 4. 验证 AndroidManifest.xml
MANIFEST="app/src/main/AndroidManifest.xml"
if [ -f "$MANIFEST" ]; then
    log_info "验证 AndroidManifest.xml..."
    
    # 检查 AppKey
    if ! grep -q "android:name=\"dcloud_appkey\"" "$MANIFEST"; then
        log_warn "AndroidManifest.xml 中缺少 dcloud_appkey 配置"
    else
        CURRENT_KEY=$(grep -o 'android:value="[^"]*"' "$MANIFEST" | grep -v 'xmlns' | head -1 | sed 's/android:value="//;s/"//')
        log_info "当前 AppKey: ${CURRENT_KEY}"
    fi
fi

# 5. 验证 build.gradle
BUILD_GRADLE="app/build.gradle"
if [ -f "$BUILD_GRADLE" ]; then
    log_info "验证 build.gradle..."
    
    # 检查 namespace
    if ! grep -q "namespace 'com.jmcw.kahe'" "$BUILD_GRADLE"; then
        log_warn "build.gradle 中的 namespace 可能需要更新为 com.jmcw.kahe"
    fi
    
    # 检查 applicationId
    if ! grep -q 'applicationId "com.jmcw.kahe"' "$BUILD_GRADLE"; then
        log_warn "build.gradle 中的 applicationId 可能需要更新为 com.jmcw.kahe"
    fi
fi

log_info "修复完成！"
