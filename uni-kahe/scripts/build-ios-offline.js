#!/usr/bin/env node

/**
 * iOS 离线打包脚本
 * 功能：
 * 1. 编译 UniApp (app-ios 平台)
 * 2. 复制资源到 iOS 项目的 Pandora 目录
 * 3. 可选：构建 iOS 项目
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logInfo(message) {
  log(`[INFO] ${message}`, 'green');
}

function logWarn(message) {
  log(`[WARN] ${message}`, 'yellow');
}

function logError(message) {
  log(`[ERROR] ${message}`, 'red');
}

// 配置
const config = {
  // 当前脚本所在目录（uni-kahe）
  uniappDir: __dirname.replace(/\/scripts$/, ''),
  // 项目根目录
  projectRoot: path.resolve(__dirname, '../..'),
  // iOS 项目目录
  iosDir: path.resolve(__dirname, '../../iOS'),
  // AppID（从 manifest.json 读取或使用默认值）
  appId: '__UNI__2BE2CDB',
  // iOS 项目 scheme
  scheme: 'uniapp-kahe',
  // 构建配置
  configuration: 'Release', // Debug 或 Release
  // SDK 类型
  sdk: 'iphoneos', // iphoneos 或 iphonesimulator
};

// 解析命令行参数
const args = process.argv.slice(2);
const options = {
  skipCopy: args.includes('--skip-copy'),
  skipIos: !args.includes('--build-ios'), // 默认跳过 iOS 构建，除非明确指定 --build-ios
  buildIos: args.includes('--build-ios'), // 明确指定要构建 iOS
  buildOnly: args.includes('--build-only'),
  copyOnly: args.includes('--copy-only'),
  configuration: args.find(arg => arg.startsWith('--configuration='))?.split('=')[1] || config.configuration,
  sdk: args.find(arg => arg.startsWith('--sdk='))?.split('=')[1] || config.sdk,
  help: args.includes('--help'),
};

if (options.help) {
  console.log(`
iOS 离线打包脚本

用法: node scripts/build-ios-offline.js [选项]

选项:
  --build-only      只编译 UniApp，不复制资源和构建 iOS
  --copy-only       只复制资源，不编译和构建 iOS
  --skip-copy       跳过资源复制步骤
  --build-ios       构建 iOS 项目（默认不构建）
  --configuration=  构建配置 (Debug/Release，默认: Release)
  --sdk=            SDK 类型 (iphoneos/iphonesimulator，默认: iphoneos)
  --help            显示帮助信息

示例:
  # 默认：编译 + 复制资源（不构建 iOS）
  yarn build:ios-offline

  # 完整流程：编译 + 复制 + 构建 iOS
  yarn build:ios-offline --build-ios

  # 只编译 UniApp
  yarn build:ios-offline --build-only

  # 只复制资源
  yarn build:ios-offline --copy-only
`);
  process.exit(0);
}

// 读取 manifest.json 获取 AppID
// 支持 JSON5 格式（带注释的 JSON）
function getAppId() {
  const manifestPath = path.join(config.uniappDir, 'src', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    try {
      let content = fs.readFileSync(manifestPath, 'utf8');
      
      // 移除 JSON5 注释（支持单行和多行注释）
      // 移除单行注释 //
      content = content.replace(/\/\/.*$/gm, '');
      // 移除多行注释 /* ... */
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // 解析 JSON
      const manifest = JSON.parse(content);
      if (manifest.appid) {
        logInfo(`从 manifest.json 读取到 AppID: ${manifest.appid}`);
        return manifest.appid;
      }
    } catch (error) {
      logWarn(`无法读取 manifest.json: ${error.message}`);
      logWarn(`使用默认 AppID: ${config.appId}`);
    }
  } else {
    logWarn(`manifest.json 文件不存在: ${manifestPath}`);
    logWarn(`使用默认 AppID: ${config.appId}`);
  }
  return config.appId;
}

// 编译 UniApp
function buildUniApp() {
  logInfo('开始编译 UniApp (app-ios 平台)...');
  
  try {
    execSync('yarn build:app-ios', {
      cwd: config.uniappDir,
      stdio: 'inherit',
    });
    logInfo('UniApp 编译完成 ✓');
    return true;
  } catch (error) {
    logError('UniApp 编译失败');
    process.exit(1);
  }
}

// 复制资源到 Pandora 目录
function copyResources() {
  logInfo('复制 UniApp 资源到 Pandora 目录...');
  
  const appId = getAppId();
  // 注意：yarn build:app-ios 输出的目录是 app，不是 app-ios
  const uniappBuildDir = path.join(config.uniappDir, 'dist', 'build', 'app');
  const pandoraDir = path.join(config.iosDir, 'uniapp-kahe', 'Pandora', 'apps', appId, 'www');
  
  // 检查编译输出目录
  if (!fs.existsSync(uniappBuildDir)) {
    logError(`UniApp 编译输出目录不存在: ${uniappBuildDir}`);
    logError('请先执行编译步骤: yarn build:app-ios');
    logError('或者使用: yarn build:ios-offline:build');
    process.exit(1);
  }
  
  // 检查输出目录是否为空
  try {
    const files = fs.readdirSync(uniappBuildDir);
    if (files.length === 0) {
      logError(`编译输出目录为空: ${uniappBuildDir}`);
      logError('请先执行编译步骤: yarn build:app-ios');
      process.exit(1);
    }
  } catch (error) {
    logError(`无法读取编译输出目录: ${error.message}`);
    process.exit(1);
  }
  
  // 创建 Pandora 目录
  if (!fs.existsSync(pandoraDir)) {
    logWarn(`Pandora 目录不存在，正在创建: ${pandoraDir}`);
    fs.mkdirSync(pandoraDir, { recursive: true });
  }
  
  // 复制文件
  logInfo(`从 ${uniappBuildDir} 复制到 ${pandoraDir}`);
  
  try {
    // 使用 rsync 或 cp 命令（更可靠）
    if (process.platform === 'darwin' || process.platform === 'linux') {
      execSync(`cp -R "${uniappBuildDir}"/* "${pandoraDir}/"`, {
        stdio: 'inherit',
      });
    } else {
      // Windows 使用 xcopy 或 robocopy
      logError('Windows 平台请手动复制文件或使用 Git Bash');
      process.exit(1);
    }
    
    logInfo('资源复制完成 ✓');
    logInfo(`资源目录: ${pandoraDir}`);
    return true;
  } catch (error) {
    logError(`资源复制失败: ${error.message}`);
    process.exit(1);
  }
}

// 构建 iOS 项目
function buildIOS() {
  logInfo('开始构建 iOS 项目...');
  
  const iosProject = path.join(config.iosDir, 'uniapp-kahe.xcodeproj');
  const outputDir = path.join(config.projectRoot, 'build', 'ios');
  const archivePath = path.join(outputDir, `${config.scheme}.xcarchive`);
  
  // 检查 iOS 项目
  if (!fs.existsSync(iosProject)) {
    logError(`iOS 项目不存在: ${iosProject}`);
    process.exit(1);
  }
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 清理之前的构建
  logInfo('清理之前的构建...');
  try {
    execSync(
      `xcodebuild clean -project "${iosProject}" -scheme "${config.scheme}" -configuration "${options.configuration}" -quiet`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    logWarn('清理构建失败，继续执行...');
  }
  
  // 构建并归档
  logInfo(`构建 iOS 项目 (Configuration: ${options.configuration}, SDK: ${options.sdk})...`);
  try {
    execSync(
      `xcodebuild archive -project "${iosProject}" -scheme "${config.scheme}" -configuration "${options.configuration}" -sdk "${options.sdk}" -archivePath "${archivePath}" -allowProvisioningUpdates CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO`,
      { stdio: 'inherit' }
    );
    logInfo('iOS 项目构建完成 ✓');
    logInfo(`归档路径: ${archivePath}`);
    return true;
  } catch (error) {
    logError('iOS 项目构建失败');
    process.exit(1);
  }
}

// 主流程
function main() {
  logInfo('==========================================');
  logInfo('iOS 离线打包脚本');
  logInfo('==========================================');
  
  const appId = getAppId();
  logInfo(`使用 AppID: ${appId}`);
  
  // 只构建
  if (options.buildOnly) {
    buildUniApp();
    return;
  }
  
  // 只复制
  if (options.copyOnly) {
    copyResources();
    return;
  }
  
  // 完整流程
  if (!options.skipCopy && !options.copyOnly) {
    // 先编译
    buildUniApp();
    // 再复制
    copyResources();
  } else if (options.copyOnly) {
    // 只复制，不编译
    copyResources();
  } else {
    logWarn('跳过 UniApp 编译和资源复制');
  }
  
  // 默认不构建 iOS，除非明确指定 --build-ios
  if (options.buildIos) {
    buildIOS();
  } else {
    logInfo('跳过 iOS 构建（使用 --build-ios 可启用 iOS 构建）');
  }
  
  logInfo('==========================================');
  logInfo('资源更新完成！');
  logInfo('==========================================');
  logInfo('提示：可以在 Xcode 中打开项目进行构建和运行');
}

// 执行
main();
