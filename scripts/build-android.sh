#!/bin/bash

# UniApp Android 资源同步脚本
# 用途：编译 UniApp，并将生成的 www 资源同步到 Android 工程的 assets 目录
# 注意：此脚本只同步资源，不编译原生 Android 项目

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

# Android 工程目录与 UniApp AppID
ANDROID_DIR="$PROJECT_ROOT/android"
ANDROID_APP_ID="__UNI__2BE2CDB"
ANDROID_WWW_DIR="$ANDROID_DIR/app/src/main/assets/apps/$ANDROID_APP_ID/www"

# 构建模式：production 或 development
BUILD_MODE="production"

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
    log_info "构建模式: $BUILD_MODE"
    
    cd "$UNIAPP_DIR"
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ]; then
        log_info "安装 UniApp 依赖..."
        yarn install
    fi
    
    # 根据模式选择编译命令
    if [ "$BUILD_MODE" = "development" ]; then
        log_info "执行: yarn build:app-android --mode development"
        yarn build:app-android --mode development
    else
        log_info "执行: yarn build:app-android"
        yarn build:app-android
    fi
    
    if [ $? -ne 0 ]; then
        log_error "UniApp 编译失败"
        exit 1
    fi
    
    log_info "UniApp 编译完成 ✓"
}

# ==================== 复制资源到 Android assets ====================
copy_resources() {
    log_info "开始复制 UniApp 资源到 Android assets..."
    
    # UniApp 编译输出目录（app-android 平台输出到 dist/build/app）
    UNIAPP_BUILD_DIR="$UNIAPP_DIR/dist/build/app"
    
    if [ ! -d "$UNIAPP_BUILD_DIR" ]; then
        log_error "UniApp 编译输出目录不存在: $UNIAPP_BUILD_DIR"
        log_error "请先执行编译步骤"
        exit 1
    fi
    
    # 创建 Android assets 目录并复制资源
    mkdir -p "$ANDROID_WWW_DIR"
    log_info "复制到 Android 资源目录: $ANDROID_WWW_DIR"
    
    # 如需完全清空旧资源，可取消下一行注释
    # rm -rf "$ANDROID_WWW_DIR"/*
    
    cp -R "$UNIAPP_BUILD_DIR"/* "$ANDROID_WWW_DIR/"
    
    # ---------- 修复 Android __uniappview.html ----------
    # Vite CLI 编译产出的 __uniappview.html 需要适配 Android 原生 SDK
    # 使用 uni-app-view.umd.js (Vite 构建的 View 层运行时)
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
      document.addEventListener('DOMContentLoaded', function() {
          document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px'
      })
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
    
    # 创建 view.css（如果不存在）
    if [ -f "$ANDROID_WWW_DIR/app.css" ] && [ ! -f "$ANDROID_WWW_DIR/view.css" ]; then
        log_info "创建 view.css（从 app.css 复制）..."
        cp "$ANDROID_WWW_DIR/app.css" "$ANDROID_WWW_DIR/view.css"
        log_info "view.css 已创建 ✓"
    fi
    
    # ---------- 创建 control.xml（如果不存在）----------
    # DCloud 离线打包必需的控制文件
    ANDROID_APP_DIR="$ANDROID_DIR/app/src/main/assets/apps/$ANDROID_APP_ID"
    CONTROL_XML="$ANDROID_APP_DIR/control.xml"
    if [ ! -f "$CONTROL_XML" ]; then
        log_warn "control.xml 不存在，正在创建..."
        mkdir -p "$ANDROID_APP_DIR"
        cat > "$CONTROL_XML" << 'CONTROLXML'
<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.65453">
<apps>
    <app appid="__UNI__2BE2CDB" appver="1.0.0"/>
</apps>
</hbuilder>
CONTROLXML
        log_info "control.xml 已创建 ✓"
    else
        log_info "control.xml 已存在"
    fi
    
    # 创建 view.umd.min.js 软链接（如果不存在）
    if [ -f "$ANDROID_WWW_DIR/uni-app-view.umd.js" ] && [ ! -f "$ANDROID_WWW_DIR/view.umd.min.js" ]; then
        log_info "创建 view.umd.min.js（软链接到 uni-app-view.umd.js）..."
        ln -sf uni-app-view.umd.js "$ANDROID_WWW_DIR/view.umd.min.js" 2>/dev/null || \
            cp "$ANDROID_WWW_DIR/uni-app-view.umd.js" "$ANDROID_WWW_DIR/view.umd.min.js"
        log_info "view.umd.min.js 已创建 ✓"
    fi
    
    # ---------- 修复 app-config.js ----------
    # 如果 app-config.js 是空的，需要创建基本配置
    APP_CONFIG_JS="$ANDROID_WWW_DIR/app-config.js"
    if [ -f "$APP_CONFIG_JS" ]; then
        # 检查文件大小，如果小于 50 字节视为空
        file_size=$(stat -f%z "$APP_CONFIG_JS" 2>/dev/null || stat -c%s "$APP_CONFIG_JS" 2>/dev/null || echo 0)
        if [ "$file_size" -lt 50 ]; then
            log_warn "app-config.js 几乎为空 ($file_size bytes)，正在修复..."
            cat > "$APP_CONFIG_JS" << 'CONFIGJS'
(function(){
  var config = {
    "pages": [
      "pages/index/index",
      "pages/home/index",
      "pages/mine/index",
      "pages/box/index",
      "pages/machine/index",
      "pages/merchant/index",
      "pages/login/index"
    ],
    "subPackages": [],
    "globalStyle": {
      "navigationBarTextStyle": "black",
      "navigationBarTitleText": "",
      "navigationBarBackgroundColor": "#FDEFCC",
      "backgroundColor": "#FDEFCC"
    },
    "tabBar": {
      "custom": true,
      "list": [
        {"pagePath": "pages/home/index", "text": "首页"},
        {"pagePath": "pages/merchant/index", "text": "商家"},
        {"pagePath": "pages/machine/index", "text": "抽卡机"},
        {"pagePath": "pages/box/index", "text": "盒柜"},
        {"pagePath": "pages/mine/index", "text": "我的"}
      ]
    }
  };
  if (typeof exports !== 'undefined') {
    exports.config = config;
  }
  if (typeof window !== 'undefined') {
    window.__uniConfig = config;
  }
})();
CONFIGJS
            log_info "app-config.js 已修复 ✓"
        else
            log_info "app-config.js 正常 ($file_size bytes)"
        fi
    else
        log_warn "app-config.js 不存在"
    fi
    
    # ---------- 创建 app-view.js ----------
    # 如果 app-view.js 不存在，需要创建
    APP_VIEW_JS="$ANDROID_WWW_DIR/app-view.js"
    if [ ! -f "$APP_VIEW_JS" ]; then
        log_warn "app-view.js 不存在，正在创建..."
        cat > "$APP_VIEW_JS" << 'VIEWJS'
(function() {
  'use strict';
  if (typeof uni === 'undefined') {
    console.error('uni is not defined');
    return;
  }
  if (typeof Vue !== 'undefined') {
    var app = Vue.createApp({});
    if (window.__uniConfig) {
      app.config.globalProperties.$config = window.__uniConfig;
    }
  }
  if (typeof plus !== 'undefined' && plus.webview) {
    var currentWebview = plus.webview.currentWebview();
    if (currentWebview) {
      currentWebview.evalJS('typeof __uniapp__ready !== "undefined" && __uniapp__ready()');
    }
  }
  document.dispatchEvent(new Event('uni-app-ready'));
})();
VIEWJS
        log_info "app-view.js 已创建 ✓"
    fi
    
    log_info "Android 资源复制完成 ✓"
}

# ==================== 主流程 ====================
main() {
    log_info "=========================================="
    log_info "UniApp Android 资源同步脚本"
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
            --test)
                BUILD_MODE="development"
                log_info "已切换到测试环境模式"
                shift
                ;;
            --mode)
                if [ "$2" = "dev" ] || [ "$2" = "development" ] || [ "$2" = "test" ]; then
                    BUILD_MODE="development"
                    log_info "已切换到测试环境模式"
                elif [ "$2" = "prod" ] || [ "$2" = "production" ]; then
                    BUILD_MODE="production"
                    log_info "已切换到生产环境模式"
                else
                    log_error "未知模式: $2，可选: dev/development/test 或 prod/production"
                    exit 1
                fi
                shift 2
                ;;
            --help)
                echo "用法: $0 [选项]"
                echo ""
                echo "选项:"
                echo "  --skip-uniapp      跳过 UniApp 编译，仅同步已有编译结果"
                echo "  --skip-copy        跳过资源复制"
                echo "  --test             使用测试环境配置打包（等价于 --mode development）"
                echo "  --mode <mode>      指定构建模式: dev/development/test 或 prod/production（默认: production）"
                echo "  --help             显示帮助信息"
                echo ""
                echo "示例:"
                echo "  $0                 # 生产环境打包并同步到 Android"
                echo "  $0 --test          # 测试环境打包并同步到 Android"
                echo "  $0 --mode dev      # 测试环境打包并同步到 Android"
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
    log_info ""
    log_info "提示: 资源已同步到 Android 工程，请使用 Android Studio 打开项目进行原生编译"
}

# 执行主流程
main "$@"
