#!/bin/bash

# UniApp 离线资源构建脚本
# 用途：编译 UniApp，并同时替换 iOS 的 Pandora 资源与 Android 的 assets 资源

set -e  # 遇到错误立即退出

# ==================== Node 版本切换 ====================
# 通过 nvm 切换到 Node 18，确保 UniApp 编译兼容性
NODE_VERSION="18"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1091
    . "$NVM_DIR/nvm.sh"
    echo "[INFO] 当前 Node 版本: $(node -v)"
    echo "[INFO] 切换到 Node $NODE_VERSION..."
    nvm use "$NODE_VERSION"
    echo "[INFO] 已切换到 Node 版本: $(node -v)"
else
    echo "[WARN] 未找到 nvm，将使用当前 Node 版本: $(node -v 2>/dev/null || echo '未安装')"
fi

# 启用 corepack 以支持 yarn（Node 18+ 内置）
if command -v corepack &> /dev/null; then
    corepack enable 2>/dev/null || true
    echo "[INFO] corepack 已启用，yarn 版本: $(yarn -v 2>/dev/null || echo '未检测到')"
fi

# ==================== 配置区域 ====================
# 脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 项目根目录（脚本目录的上一级）
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# UniApp 源码目录
UNIAPP_DIR="$PROJECT_ROOT/uni-kahe"

# iOS 项目目录
IOS_DIR="$PROJECT_ROOT/iOS"
IOS_PROJECT="$IOS_DIR/uniapp-kahe.xcodeproj"

# UniApp AppID（必须与 manifest.json 和 control.xml 中的一致）
# 注意：如果 manifest.json 中的 appid 与 Pandora 目录不一致，请修改此值
APP_ID="__UNI__2BE2CDB"  # 默认使用 iOS Pandora 目录中的 AppID

# iOS Pandora 资源目录
PANDORA_DIR="$IOS_DIR/uniapp-kahe/Pandora/apps/$APP_ID/www"

# Android 工程目录与 UniApp AppID
ANDROID_DIR="$PROJECT_ROOT/android"
ANDROID_APP_ID="__UNI__2BE2CDB"  # Android assets 中当前使用的 AppID 目录
ANDROID_WWW_DIR="$ANDROID_DIR/app/src/main/assets/apps/$ANDROID_APP_ID/www"

# 构建配置
SCHEME="uniapp-kahe"
CONFIGURATION="Release"  # 可选: Debug, Release
SDK="iphoneos"  # 可选: iphoneos, iphonesimulator

# 输出目录
OUTPUT_DIR="$PROJECT_ROOT/build/ios"
ARCHIVE_PATH="$OUTPUT_DIR/$SCHEME.xcarchive"
IPA_PATH="$OUTPUT_DIR/$SCHEME.ipa"

# ==================== 颜色输出 ====================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ==================== 检查环境 ====================
check_environment() {
    log_info "检查构建环境..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "未找到 Node.js，请先安装 Node.js"
        exit 1
    fi
    
    # 检查 yarn
    if ! command -v yarn &> /dev/null; then
        log_error "未找到 yarn，请先安装 yarn"
        exit 1
    fi
    
    # 检查 xcodebuild
    if ! command -v xcodebuild &> /dev/null; then
        log_error "未找到 xcodebuild，请确保已安装 Xcode"
        exit 1
    fi
    
    # 检查 UniApp 目录
    if [ ! -d "$UNIAPP_DIR" ]; then
        log_error "UniApp 目录不存在: $UNIAPP_DIR"
        exit 1
    fi
    
    # 检查 iOS 项目
    if [ ! -d "$IOS_PROJECT" ]; then
        log_error "iOS 项目不存在: $IOS_PROJECT"
        exit 1
    fi
    
    log_info "环境检查通过 ✓"
}

# ==================== 编译 UniApp ====================
build_uniapp() {
    log_info "开始编译 UniApp (app 通用平台)..."
    
    cd "$UNIAPP_DIR"
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ]; then
        log_info "安装 UniApp 依赖..."
        yarn install
    fi
    
    # 编译 app 通用平台（同时兼容 iOS 和 Android）
    # 注意：不要用 build:app-ios 或 build:app-android，否则会排除另一平台的条件编译代码
    log_info "执行: yarn build:app"
    yarn build:app
    
    if [ $? -ne 0 ]; then
        log_error "UniApp 编译失败"
        exit 1
    fi
    
    log_info "UniApp 编译完成 ✓"
}

# ==================== 复制资源到 Pandora ====================
copy_resources() {
    log_info "开始复制 UniApp 资源到 iOS Pandora 与 Android assets..."
    
    # UniApp 编译输出目录
    # 注意：yarn build:app 输出到 dist/build/app 目录
    UNIAPP_BUILD_DIR="$UNIAPP_DIR/dist/build/app"
    
    if [ ! -d "$UNIAPP_BUILD_DIR" ]; then
        log_error "UniApp 编译输出目录不存在: $UNIAPP_BUILD_DIR"
        log_error "请先执行编译步骤"
        exit 1
    fi
    
    # ---------- iOS Pandora ----------
    mkdir -p "$PANDORA_DIR"
    log_info "复制到 iOS Pandora 目录: $PANDORA_DIR"
    # 如需完全清空旧资源，可取消下一行注释
    # rm -rf "$PANDORA_DIR"/*
    cp -R "$UNIAPP_BUILD_DIR"/* "$PANDORA_DIR/"
    
    # ---------- Android assets ----------
    if [ -d "$ANDROID_DIR" ]; then
        mkdir -p "$ANDROID_WWW_DIR"
        log_info "复制到 Android 资源目录: $ANDROID_WWW_DIR"
        # 如需完全清空旧资源，可取消下一行注释
        # rm -rf "$ANDROID_WWW_DIR"/*
        cp -R "$UNIAPP_BUILD_DIR"/* "$ANDROID_WWW_DIR/"
        
        # ---------- 修复 Android __uniappview.html ----------
        # Vite CLI 编译产出的 __uniappview.html 使用 uni-app-view.umd.js（Web 运行时），
        # 但 DCloud Android 原生 SDK 需要加载 view.umd.min.js + app-view.js 才能正常工作。
        # 这里替换为 SDK 兼容的格式。
        ANDROID_VIEW_HTML="$ANDROID_WWW_DIR/__uniappview.html"
        if [ -f "$ANDROID_VIEW_HTML" ]; then
            log_info "修复 Android __uniappview.html（适配原生 SDK 运行时）..."
            cat > "$ANDROID_VIEW_HTML" << 'VIEWHTML'
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script>
      var __UniViewStartTime__ = Date.now();
      var coverSupport = 'CSS' in window && typeof CSS.supports === 'function' && (CSS.supports('top: env(a)') ||
        CSS.supports('top: constant(a)'))
      document.write(
        '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
        (coverSupport ? ', viewport-fit=cover' : '') + '" />')
    </script>
    <title>View</title>
    <link rel="stylesheet" href="view.css" />
  </head>
  <body>
    <div id="app"></div>
    <script src="view.umd.min.js"></script>
    <script src="app-view.js"></script>
  </body>
</html>
VIEWHTML
            log_info "Android __uniappview.html 已修复 ✓"
        fi
        
        log_info "Android 资源复制完成 ✓"
    else
        log_warn "未检测到 Android 工程目录: $ANDROID_DIR，已跳过 Android 资源复制"
    fi
    
    log_info "iOS 资源复制完成 ✓"
    log_info "iOS 资源目录: $PANDORA_DIR"
}

# ==================== 构建 iOS 项目 ====================
build_ios() {
    log_info "开始构建 iOS 项目..."
    
    cd "$IOS_DIR"
    
    # 创建输出目录
    mkdir -p "$OUTPUT_DIR"
    
    # 清理之前的构建
    log_info "清理之前的构建..."
    xcodebuild clean \
        -project "$IOS_PROJECT" \
        -scheme "$SCHEME" \
        -configuration "$CONFIGURATION" \
        -quiet
    
    # 构建并归档
    log_info "构建 iOS 项目 (Configuration: $CONFIGURATION, SDK: $SDK)..."
    xcodebuild archive \
        -project "$IOS_PROJECT" \
        -scheme "$SCHEME" \
        -configuration "$CONFIGURATION" \
        -sdk "$SDK" \
        -archivePath "$ARCHIVE_PATH" \
        -allowProvisioningUpdates \
        CODE_SIGN_IDENTITY="" \
        CODE_SIGNING_REQUIRED=NO \
        CODE_SIGNING_ALLOWED=NO
    
    if [ $? -ne 0 ]; then
        log_error "iOS 项目构建失败"
        exit 1
    fi
    
    log_info "iOS 项目构建完成 ✓"
    log_info "归档路径: $ARCHIVE_PATH"
}

# ==================== 导出 IPA（可选）====================
export_ipa() {
    log_info "导出 IPA 文件..."
    
    # 注意：导出 IPA 需要配置 ExportOptions.plist
    # 这里提供一个基本示例，实际使用时需要根据你的证书配置调整
    
    log_warn "导出 IPA 需要配置 ExportOptions.plist"
    log_warn "请根据你的证书配置创建 ExportOptions.plist 文件"
    log_warn "然后使用以下命令导出:"
    log_warn "xcodebuild -exportArchive \\"
    log_warn "  -archivePath \"$ARCHIVE_PATH\" \\"
    log_warn "  -exportPath \"$OUTPUT_DIR\" \\"
    log_warn "  -exportOptionsPlist ExportOptions.plist"
    
    # 如果需要自动导出，取消下面的注释并配置 ExportOptions.plist
    # if [ -f "ExportOptions.plist" ]; then
    #     xcodebuild -exportArchive \
    #         -archivePath "$ARCHIVE_PATH" \
    #         -exportPath "$OUTPUT_DIR" \
    #         -exportOptionsPlist ExportOptions.plist
    #     
    #     if [ $? -eq 0 ]; then
    #         log_info "IPA 导出完成 ✓"
    #         log_info "IPA 路径: $IPA_PATH"
    #     else
    #         log_error "IPA 导出失败"
    #         exit 1
    #     fi
    # else
    #     log_warn "未找到 ExportOptions.plist，跳过 IPA 导出"
    # fi
}

# ==================== 主流程 ====================
main() {
    log_info "=========================================="
    log_info "UniApp 离线资源构建脚本（iOS + Android）"
    log_info "=========================================="
    
    # 解析命令行参数
    SKIP_UNIAPP_BUILD=false
    SKIP_COPY=false
    SKIP_IOS_BUILD=false
    EXPORT_IPA=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --skip-uniapp)
                SKIP_UNIAPP_BUILD=true
                shift
                ;;
            --skip-copy)
                SKIP_COPY=true
                shift
                ;;
            --skip-ios)
                SKIP_IOS_BUILD=true
                shift
                ;;
            --export-ipa)
                EXPORT_IPA=true
                shift
                ;;
            --configuration)
                CONFIGURATION="$2"
                shift 2
                ;;
            --sdk)
                SDK="$2"
                shift 2
                ;;
            --help)
                echo "用法: $0 [选项]"
                echo ""
                echo "选项:"
                echo "  --skip-uniapp      跳过 UniApp 编译"
                echo "  --skip-copy         跳过资源复制（iOS + Android）"
                echo "  --skip-ios          跳过 iOS 构建，仅同步资源"
                echo "  --export-ipa        导出 IPA 文件（需要配置 ExportOptions.plist）"
                echo "  --configuration     构建配置 (Debug/Release，默认: Release)"
                echo "  --sdk               SDK 类型 (iphoneos/iphonesimulator，默认: iphoneos)"
                echo "  --help              显示帮助信息"
                exit 0
                ;;
            *)
                log_error "未知参数: $1"
                echo "使用 --help 查看帮助信息"
                exit 1
                ;;
        esac
    done
    
    # 检查环境
    check_environment
    
    # 编译 UniApp
    if [ "$SKIP_UNIAPP_BUILD" = false ]; then
        build_uniapp
    else
        log_warn "跳过 UniApp 编译"
    fi
    
    # 复制资源
    if [ "$SKIP_COPY" = false ]; then
        copy_resources
    else
        log_warn "跳过资源复制"
    fi
    
    # 构建 iOS
    if [ "$SKIP_IOS_BUILD" = false ]; then
        build_ios
    else
        log_warn "跳过 iOS 构建"
    fi
    
    # 导出 IPA（如果需要）
    if [ "$EXPORT_IPA" = true ]; then
        export_ipa
    fi
    
    log_info "=========================================="
    log_info "构建完成！"
    log_info "=========================================="
    log_info "归档文件: $ARCHIVE_PATH"
    if [ "$EXPORT_IPA" = true ] && [ -f "$IPA_PATH" ]; then
        log_info "IPA 文件: $IPA_PATH"
    fi
}

# 执行主流程
main "$@"
