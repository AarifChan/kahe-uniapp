#!/bin/bash
#
# UniApp Android 启动图问题诊断和修复脚本
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "${BLUE}[CHECK]${NC} $1"; }

PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
ANDROID_DIR="${ANDROID_DIR:-$PROJECT_ROOT/android}"
UNIAPP_DIR="${UNIAPP_DIR:-$PROJECT_ROOT/uni-app}"

# 检查 manifest.json
check_manifest() {
    log_step "Checking manifest.json..."
    
    local manifest_file="$ANDROID_DIR/app/src/main/assets/apps/__UNI__2BE2CDB/www/manifest.json"
    if [ ! -f "$manifest_file" ]; then
        # 尝试其他路径
        manifest_file=$(find "$ANDROID_DIR" -name "manifest.json" -path "*/www/*" | head -1)
    fi
    
    if [ -f "$manifest_file" ]; then
        log_info "Found: $manifest_file"
        
        # 检查 autoclose
        if grep -q '"autoclose"[[:space:]]*:[[:space:]]*false' "$manifest_file"; then
            log_error "❌ splashscreen.autoclose is false - This will block the app!"
            log_info "   Fix: Change autoclose to true in manifest.json"
        elif grep -q '"autoclose"[[:space:]]*:[[:space:]]*true' "$manifest_file"; then
            log_info "✅ splashscreen.autoclose is true"
        else
            log_warn "⚠️  Cannot determine autoclose value"
        fi
    else
        log_error "❌ manifest.json not found"
    fi
}

# 检查 __uniappview.html
check_view_html() {
    log_step "Checking __uniappview.html..."
    
    local html_file="$ANDROID_DIR/app/src/main/assets/apps/__UNI__2BE2CDB/www/__uniappview.html"
    if [ ! -f "$html_file" ]; then
        html_file=$(find "$ANDROID_DIR" -name "__uniappview.html" | head -1)
    fi
    
    if [ -f "$html_file" ]; then
        log_info "Found: $html_file"
        
        # 检查引用的文件
        if grep -q "view.umd.min.js" "$html_file"; then
            log_warn "⚠️  HTML references view.umd.min.js (old format)"
            
            # 检查文件是否存在
            local www_dir=$(dirname "$html_file")
            if [ ! -f "$www_dir/view.umd.min.js" ]; then
                log_error "❌ view.umd.min.js not found!"
                log_info "   Fix: Update HTML to use uni-app-view.umd.js"
            fi
        elif grep -q "uni-app-view.umd.js" "$html_file"; then
            log_info "✅ HTML references uni-app-view.umd.js (correct for Vite)"
        fi
        
        # 检查 CSS
        if grep -q "app.css" "$html_file"; then
            log_info "✅ HTML references app.css"
        elif grep -q "view.css" "$html_file"; then
            log_warn "⚠️  HTML references view.css (old format)"
        fi
    else
        log_error "❌ __uniappview.html not found"
    fi
}

# 检查 AndroidManifest.xml
check_manifest_xml() {
    log_step "Checking AndroidManifest.xml..."
    
    local manifest_xml="$ANDROID_DIR/app/src/main/AndroidManifest.xml"
    
    if [ -f "$manifest_xml" ]; then
        log_info "Found: $manifest_xml"
        
        # 检查 PandoraEntry 的 theme
        if grep -A 10 'android:name="io.dcloud.PandoraEntry"' "$manifest_xml" | grep -q 'TranslucentTheme'; then
            log_error "❌ PandoraEntry uses TranslucentTheme - This causes splash screen issues!"
            log_info "   Fix: Change theme to @style/DCloudTheme"
        elif grep -A 10 'android:name="io.dcloud.PandoraEntry"' "$manifest_xml" | grep -q 'DCloudTheme'; then
            log_info "✅ PandoraEntry uses DCloudTheme"
        fi
    else
        log_error "❌ AndroidManifest.xml not found"
    fi
}

# 检查资源文件
check_resources() {
    log_step "Checking resources..."
    
    # 检查 splash.png
    local splash_files=$(find "$ANDROID_DIR/app/src/main/res" -name "splash.png" 2>/dev/null | wc -l)
    if [ "$splash_files" -gt 0 ]; then
        log_info "✅ Found $splash_files splash.png file(s)"
    else
        log_warn "⚠️  No splash.png found in res directories"
    fi
    
    # 检查 icon.png
    local icon_files=$(find "$ANDROID_DIR/app/src/main/res" -name "icon.png" 2>/dev/null | wc -l)
    if [ "$icon_files" -gt 0 ]; then
        log_info "✅ Found $icon_files icon.png file(s)"
    else
        log_warn "⚠️  No icon.png found in res directories"
    fi
}

# 检查 control.xml
check_control_xml() {
    log_step "Checking dcloud_control.xml..."
    
    local control_xml="$ANDROID_DIR/app/src/main/assets/data/dcloud_control.xml"
    
    if [ -f "$control_xml" ]; then
        log_info "Found: $control_xml"
        cat "$control_xml"
    else
        log_error "❌ dcloud_control.xml not found"
    fi
}

# 主流程
main() {
    echo "=========================================="
    echo "UniApp Android Splash Screen Diagnostics"
    echo "=========================================="
    echo ""
    
    check_manifest
    echo ""
    check_view_html
    echo ""
    check_manifest_xml
    echo ""
    check_resources
    echo ""
    check_control_xml
    
    echo ""
    echo "=========================================="
    echo "Diagnostics complete"
    echo "=========================================="
}

main
