#!/bin/bash

# UniApp Android 离线资源同步脚本
# 用途：编译 UniApp，并将生成的 www 资源同步到 Android 工程的 assets 目录

set -e  # 遇到错误立即退出

# ==================== 配置区域 ====================
# 脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 项目根目录（脚本目录的上一级）
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# UniApp 源码目录
UNIAPP_DIR="$PROJECT_ROOT/uni-kahe"

# Android 工程目录与 UniApp AppID
ANDROID_DIR="$PROJECT_ROOT/android"
ANDROID_APP_ID="__UNI__2BE2CDB"  # Android 与 iOS 统一使用相同 AppID 目录
ANDROID_WWW_DIR="$ANDROID_DIR/app/src/main/assets/apps/$ANDROID_APP_ID/www"

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
    log_info "检查 Android 资源同步环境..."
    
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
    
    # 检查 UniApp 目录
    if [ ! -d "$UNIAPP_DIR" ]; then
        log_error "UniApp 目录不存在: $UNIAPP_DIR"
        exit 1
    fi
    
    # 检查 Android 工程
    if [ ! -d "$ANDROID_DIR" ]; then
        log_error "Android 工程目录不存在: $ANDROID_DIR"
        exit 1
    fi
    
    log_info "环境检查通过 ✓"
}

# ==================== 编译 UniApp ====================
build_uniapp() {
    log_info "开始编译 UniApp (app-plus 平台, Android)..."
    
    cd "$UNIAPP_DIR"
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ]; then
        log_info "安装 UniApp 依赖..."
        yarn install
    fi
    
    # 编译 app-plus 平台（Android）
    log_info "执行: yarn build:app-android"
    yarn build:app-android
    
    log_info "UniApp 编译完成 ✓"
}

# ==================== 复制资源到 Android assets ====================
copy_resources() {
    log_info "开始复制 UniApp 资源到 Android assets..."
    
    # UniApp 编译输出目录
    UNIAPP_BUILD_DIR="$UNIAPP_DIR/dist/build/app"
    
    if [ ! -d "$UNIAPP_BUILD_DIR" ]; then
        log_error "UniApp 编译输出目录不存在: $UNIAPP_BUILD_DIR"
        log_error "请先执行编译步骤"
        exit 1
    fi
    
    mkdir -p "$ANDROID_WWW_DIR"
    log_info "复制到 Android 资源目录: $ANDROID_WWW_DIR"
    # 如需完全清空旧资源，可取消下一行注释
    # rm -rf "$ANDROID_WWW_DIR"/*
    cp -R "$UNIAPP_BUILD_DIR"/* "$ANDROID_WWW_DIR/"
    
    log_info "Android 资源复制完成 ✓"
}

# ==================== 主流程 ====================
main() {
    log_info "=========================================="
    log_info "UniApp Android 离线资源同步脚本"
    log_info "=========================================="
    
    # 解析命令行参数
    SKIP_UNIAPP_BUILD=false
    SKIP_COPY=false
    
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
            --help)
                echo "用法: $0 [选项]"
                echo ""
                echo "选项:"
                echo "  --skip-uniapp      跳过 UniApp 编译，仅同步已有编译结果"
                echo "  --skip-copy        跳过资源复制"
                echo "  --help             显示帮助信息"
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
    
    log_info "=========================================="
    log_info "Android 资源同步完成！"
    log_info "=========================================="
    log_info "目标目录: $ANDROID_WWW_DIR"
}

# 执行主流程
main "$@"

