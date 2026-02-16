#!/bin/bash
#
# UniApp Android 离线打包脚本
# 基于官方 SDK 4.87 的完整打包方案
#

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# 配置
PROJECT_ROOT="/Users/fuqiang/Project/aarif/jmcw/kahe-uniapp"
UNIAPP_DIR="${PROJECT_ROOT}/uni-kahe"
ANDROID_DIR="${PROJECT_ROOT}/android"
SDK_DIR="/Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128"
APP_ID="__UNI__2BE2CDB"
PACKAGE_NAME="com.jmcw.kahe"
APP_KEY="bb8cbc87d252fb0887a22e0c65d9d296"

# 显示帮助
show_help() {
    cat << EOF
UniApp Android 离线打包脚本

用法: ./build-android.sh [选项]

选项:
    -h, --help          显示帮助信息
    -b, --build         完整流程：编译 + 同步 + 构建 APK
    -c, --compile       仅编译 UniApp
    -s, --sync          仅同步资源到 Android 项目
    -a, --apk           仅构建 APK（不编译 UniApp）
    -d, --debug         构建 Debug APK（默认）
    -r, --release       构建 Release APK
    -i, --install       构建后安装到设备

示例:
    # 完整流程：编译 + 同步 + 构建 Debug APK
    ./build-android.sh -b

    # 完整流程 + 安装到设备
    ./build-android.sh -b -i

    # 仅编译 UniApp
    ./build-android.sh -c

    # 仅同步资源（当 UniApp 已编译时）
    ./build-android.sh -s

    # 构建 Release APK
    ./build-android.sh -b -r

EOF
}

# 解析参数
BUILD_TYPE="debug"
DO_COMPILE=false
DO_SYNC=false
DO_BUILD=false
DO_INSTALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -b|--build)
            DO_COMPILE=true
            DO_SYNC=true
            DO_BUILD=true
            shift
            ;;
        -c|--compile)
            DO_COMPILE=true
            shift
            ;;
        -s|--sync)
            DO_SYNC=true
            shift
            ;;
        -a|--apk)
            DO_BUILD=true
            shift
            ;;
        -d|--debug)
            BUILD_TYPE="debug"
            shift
            ;;
        -r|--release)
            BUILD_TYPE="release"
            shift
            ;;
        -i|--install)
            DO_INSTALL=true
            shift
            ;;
        *)
            log_error "未知参数: $1"
            show_help
            exit 1
            ;;
    esac
done

# 如果没有指定任何操作，显示帮助
if [[ "$DO_COMPILE" == "false" && "$DO_SYNC" == "false" && "$DO_BUILD" == "false" ]]; then
    show_help
    exit 0
fi

# 步骤 1: 编译 UniApp
compile_uniapp() {
    log_step "步骤 1/4: 编译 UniApp (app-android 平台)..."
    
    cd "${UNIAPP_DIR}"
    
    # 清理之前的编译输出
    log_info "清理之前的编译输出..."
    rm -rf dist/build/app
    
    # 编译 UniApp
    log_info "开始编译..."
    yarn build:app-android
    
    if [ ! -d "dist/build/app" ]; then
        log_error "编译失败：dist/build/app 目录不存在"
        exit 1
    fi
    
    log_info "UniApp 编译完成 ✓"
}

# 步骤 2: 同步资源到 Android 项目
sync_resources() {
    log_step "步骤 2/4: 同步资源到 Android 项目..."
    
    # 检查编译输出
    if [ ! -d "${UNIAPP_DIR}/dist/build/app" ]; then
        log_error "UniApp 编译输出不存在，请先编译"
        exit 1
    fi
    
    # 目标目录
    TARGET_DIR="${ANDROID_DIR}/app/src/main/assets/apps/${APP_ID}"
    TARGET_WWW="${TARGET_DIR}/www"
    
    # 创建目录
    mkdir -p "${TARGET_WWW}"
    
    # 同步 www 目录内容
    log_info "同步资源文件..."
    rsync -av --delete "${UNIAPP_DIR}/dist/build/app/" "${TARGET_WWW}/"
    
    # 从官方 Demo 复制缺失的必要文件（如果编译输出中没有）
    DEMO_WWW="${SDK_DIR}/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www"
    
    if [ -f "${DEMO_WWW}/__uniappes6.js" ] && [ ! -f "${TARGET_WWW}/__uniappes6.js" ]; then
        log_info "复制缺失的 __uniappes6.js..."
        cp "${DEMO_WWW}/__uniappes6.js" "${TARGET_WWW}/"
    fi
    
    if [ -f "${DEMO_WWW}/app-view.js" ] && [ ! -f "${TARGET_WWW}/app-view.js" ]; then
        log_info "复制缺失的 app-view.js..."
        cp "${DEMO_WWW}/app-view.js" "${TARGET_WWW}/"
    fi
    
    # 创建/更新 dcloud_control.xml
    log_info "更新 dcloud_control.xml..."
    cat > "${ANDROID_DIR}/app/src/main/assets/data/dcloud_control.xml" << EOF
<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.81635">
<apps>
    <app appid="${APP_ID}" appver="1.0.0"/>
</apps>
</hbuilder>
EOF
    
    log_info "资源同步完成 ✓"
}

# 步骤 3: 配置检查
verify_config() {
    log_step "步骤 3/4: 验证 Android 项目配置..."
    
    # 检查 AndroidManifest.xml 中的 AppKey
    MANIFEST="${ANDROID_DIR}/app/src/main/AndroidManifest.xml"
    if [ -f "$MANIFEST" ]; then
        if grep -q "android:value=\"${APP_KEY}\"" "$MANIFEST"; then
            log_info "AppKey 配置正确 ✓"
        else
            log_warn "AndroidManifest.xml 中的 AppKey 可能不正确"
            log_warn "期望: ${APP_KEY}"
        fi
    fi
    
    # 检查 build.gradle 中的包名
    BUILD_GRADLE="${ANDROID_DIR}/app/build.gradle"
    if [ -f "$BUILD_GRADLE" ]; then
        if grep -q "applicationId \"${PACKAGE_NAME}\"" "$BUILD_GRADLE"; then
            log_info "包名配置正确 ✓"
        else
            log_warn "build.gradle 中的包名可能不正确"
            log_warn "期望: ${PACKAGE_NAME}"
        fi
    fi
    
    log_info "配置验证完成 ✓"
}

# 步骤 4: 构建 APK
build_apk() {
    log_step "步骤 4/4: 构建 ${BUILD_TYPE} APK..."
    
    cd "${ANDROID_DIR}"
    
    # 清理之前的构建
    log_info "清理之前的构建..."
    ./gradlew clean
    
    # 构建 APK
    if [ "$BUILD_TYPE" == "release" ]; then
        log_info "构建 Release APK..."
        ./gradlew assembleRelease
        APK_PATH="app/build/outputs/apk/release/app-release.apk"
    else
        log_info "构建 Debug APK..."
        ./gradlew assembleDebug
        APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    fi
    
    if [ -f "$APK_PATH" ]; then
        log_info "APK 构建成功 ✓"
        log_info "APK 路径: ${ANDROID_DIR}/${APK_PATH}"
        
        # 显示 APK 信息
        APK_SIZE=$(du -h "${APK_PATH}" | cut -f1)
        log_info "APK 大小: ${APK_SIZE}"
        
        # 安装到设备
        if [ "$DO_INSTALL" == "true" ]; then
            log_info "安装 APK 到设备..."
            adb install -r "${APK_PATH}"
            log_info "安装完成 ✓"
        fi
    else
        log_error "APK 构建失败，未找到输出文件"
        exit 1
    fi
}

# 主流程
main() {
    log_info "========================================"
    log_info "UniApp Android 离线打包"
    log_info "========================================"
    log_info "AppID: ${APP_ID}"
    log_info "包名: ${PACKAGE_NAME}"
    log_info "========================================"
    
    # 执行选定的步骤
    if [ "$DO_COMPILE" == "true" ]; then
        compile_uniapp
    fi
    
    if [ "$DO_SYNC" == "true" ]; then
        sync_resources
    fi
    
    if [ "$DO_BUILD" == "true" ]; then
        verify_config
        build_apk
    fi
    
    log_info "========================================"
    log_info "打包流程完成！"
    log_info "========================================"
}

# 执行主流程
main
