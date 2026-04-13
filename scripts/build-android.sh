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
DEMO_WWW_DIR="/Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www"
EXPECTED_UNI_COMPILER_VERSION="4.87"

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
    log_info "开始编译 UniApp (app 通用平台)..."
    log_info "构建模式: $BUILD_MODE"
    
    cd "$UNIAPP_DIR"
    
    # 安装依赖（如果需要）
    if [ ! -d "node_modules" ]; then
        log_info "安装 UniApp 依赖..."
        yarn install
    fi
    
    # 根据模式选择编译命令
    # 注意：为兼容当前 Android 离线 SDK，统一使用 app 通用平台产物（dist/build/app）
    # 避免 app-android 专用产物与壳侧运行时格式不一致（如 uni-app-view.umd.js / app-view.js 差异）
    if [ "$BUILD_MODE" = "development" ]; then
        log_info "执行: yarn build:app --mode development"
        yarn build:app --mode development
    else
        log_info "执行: yarn build:app"
        yarn build:app
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
    local source_www_dir=""
    local app_control_xml="$ANDROID_DIR/app/src/main/assets/apps/$ANDROID_APP_ID/control.xml"

    # UniApp 编译输出目录（app-android 平台输出到 dist/build/app）
    UNIAPP_BUILD_DIR="$UNIAPP_DIR/dist/build/app"

    if [ "$USE_DEMO_WWW" = true ]; then
        source_www_dir="$DEMO_WWW_DIR"
        log_warn "A/B 测试模式：使用 demo 的 www 资源"
        if [ ! -d "$source_www_dir" ]; then
            log_error "Demo www 目录不存在: $source_www_dir"
            exit 1
        fi
    else
        source_www_dir="$UNIAPP_BUILD_DIR"
        if [ ! -d "$source_www_dir" ]; then
            log_error "UniApp 编译输出目录不存在: $source_www_dir"
            log_error "请先执行编译步骤"
            exit 1
        fi
    fi
    
    # 创建 Android assets 目录并复制资源
    mkdir -p "$ANDROID_WWW_DIR"
    log_info "复制到 Android 资源目录: $ANDROID_WWW_DIR"

    # 每次同步前清空旧资源，避免残留旧版运行时文件导致卡闪屏
    rm -rf "$ANDROID_WWW_DIR"/*
    cp -R "$source_www_dir"/* "$ANDROID_WWW_DIR/"

    # demo www 的 manifest id 是 __UNI__B，需要改写为当前壳工程 AppID 才能正确启动
    if [ "$USE_DEMO_WWW" = true ] && [ -f "$ANDROID_WWW_DIR/manifest.json" ]; then
        sed -i '' "s/\"id\":\"__UNI__B\"/\"id\":\"$ANDROID_APP_ID\"/g" "$ANDROID_WWW_DIR/manifest.json"
        log_info "已重写 demo manifest appid 为: $ANDROID_APP_ID"
    fi

    if [ -f "$ANDROID_WWW_DIR/manifest.json" ]; then
        local manifest_id
        local manifest_compiler_version
        local manifest_nvue_launch_mode
        local manifest_version_name
        node -e "const fs=require('fs');const p=process.argv[1];const m=JSON.parse(fs.readFileSync(p,'utf8'));m.plus=m.plus||{};m.plus['uni-app']=m.plus['uni-app']||{};m.plus['uni-app'].nvueLaunchMode='fast';fs.writeFileSync(p,JSON.stringify(m,null,2));" "$ANDROID_WWW_DIR/manifest.json"
        manifest_id=$(node -e "const fs=require('fs');const m=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(m.id||'');" "$ANDROID_WWW_DIR/manifest.json")
        manifest_compiler_version=$(node -e "const fs=require('fs');const m=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log(((m.plus||{})['uni-app']||{}).compilerVersion||'');" "$ANDROID_WWW_DIR/manifest.json")
        manifest_nvue_launch_mode=$(node -e "const fs=require('fs');const m=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log((((m.plus||{})['uni-app']||{}).nvueLaunchMode||''));" "$ANDROID_WWW_DIR/manifest.json")
        manifest_version_name=$(node -e "const fs=require('fs');const m=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));console.log((((m.version||{}).name)||'1.0.0'));" "$ANDROID_WWW_DIR/manifest.json")

        log_info "manifest appid: $manifest_id"
        log_info "manifest compilerVersion: $manifest_compiler_version"
        log_info "manifest nvueLaunchMode: $manifest_nvue_launch_mode"

        if [ "$manifest_id" != "$ANDROID_APP_ID" ]; then
            log_error "manifest appid 不匹配，期望: $ANDROID_APP_ID，实际: $manifest_id"
            exit 1
        fi

        if [ "$USE_DEMO_WWW" = false ] && [ "$manifest_compiler_version" != "$EXPECTED_UNI_COMPILER_VERSION" ]; then
            log_warn "compilerVersion 不匹配，期望: $EXPECTED_UNI_COMPILER_VERSION，实际: $manifest_compiler_version"
            log_warn "请先升级/对齐 UniApp CLI 版本，避免出现“3.1.22 与 4.87 不匹配”弹窗"
        fi

        # 生成离线包 control.xml（壳读取主应用入口所需）
        # 说明：dcloud_control.xml 位于 assets/data，用于应用列表；
        # control.xml 位于 assets/apps/<appid>/，用于该 app 离线包控制信息。
        cat > "$app_control_xml" <<EOF
<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.82540">
<apps>
    <app appid="$manifest_id" appver="$manifest_version_name"/>
</apps>
</hbuilder>
EOF
        log_info "已生成 control.xml: $app_control_xml (appver=$manifest_version_name)"
    fi

    # 可选：仅在显式开启时注入旧壳视图运行时文件
    # 默认关闭，避免“新壳产物 + 旧壳入口”混用导致启动链路异常
    if [ "$USE_LEGACY_VIEW_RUNTIME" = true ] && [ "$USE_DEMO_WWW" = false ] && [ -f "$ANDROID_WWW_DIR/uni-app-view.umd.js" ] && [ ! -f "$ANDROID_WWW_DIR/app-view.js" ]; then
        log_warn "已开启 legacy 视图运行时注入：开始覆盖旧壳文件"
        local runtime_files=( "__uniappview.html" "__uniappes6.js" "view.umd.min.js" "app-view.js" "view.css" )
        local f=""
        for f in "${runtime_files[@]}"; do
            if [ -f "$DEMO_WWW_DIR/$f" ]; then
                cp "$DEMO_WWW_DIR/$f" "$ANDROID_WWW_DIR/$f"
            else
                log_warn "demo 运行时文件缺失，跳过: $f"
            fi
        done
        log_info "legacy 视图运行时文件注入完成"
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
    USE_DEMO_WWW=false
    USE_LEGACY_VIEW_RUNTIME=false
    
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
            --use-demo-www)
                USE_DEMO_WWW=true
                SKIP_UNIAPP_BUILD=true
                log_warn "已启用 demo www 测试模式，将跳过 UniApp 编译"
                shift
                ;;
            --test)
                BUILD_MODE="development"
                log_info "已切换到测试环境模式"
                shift
                ;;
            --legacy-view-runtime)
                USE_LEGACY_VIEW_RUNTIME=true
                log_warn "已启用 legacy 视图运行时注入（仅用于兼容性排查）"
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
                echo "  --use-demo-www     使用 SDK demo 的 www 资源做 A/B 测试（自动跳过 UniApp 编译）"
                echo "  --legacy-view-runtime  强制注入 demo 旧壳视图运行时（仅用于兼容性排查）"
                echo "  --test             使用测试环境配置打包（等价于 --mode development）"
                echo "  --mode <mode>      指定构建模式: dev/development/test 或 prod/production（默认: production）"
                echo "  --help             显示帮助信息"
                echo ""
                echo "示例:"
                echo "  $0                 # 生产环境打包并同步到 Android"
                echo "  $0 --test          # 测试环境打包并同步到 Android"
                echo "  $0 --mode dev      # 测试环境打包并同步到 Android"
                echo "  $0 --use-demo-www  # 用 demo 的 www 覆盖 Android 资源做 A/B 测试"
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
