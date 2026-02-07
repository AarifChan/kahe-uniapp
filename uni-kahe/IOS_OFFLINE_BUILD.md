# iOS 离线打包指南

本文档说明如何在 `uni-kahe` 目录下通过 `package.json` 脚本进行 iOS 离线打包。

## 快速开始

### 完整打包流程

在 `uni-kahe` 目录下执行：

```bash
yarn build:ios-offline
```

这将执行：
1. ✅ 编译 UniApp (app-ios 平台)
2. ✅ 复制资源到 iOS 项目的 Pandora 目录
3. ✅ 构建 iOS 项目并生成 .xcarchive 文件

## 可用脚本

### 主要脚本

| 脚本 | 说明 |
|------|------|
| `yarn build:ios-offline` | 完整流程：编译 + 复制 + 构建 iOS |
| `yarn build:ios-offline:build` | 只编译 UniApp，不复制和构建 |
| `yarn build:ios-offline:copy` | 只复制资源，不编译和构建 |
| `yarn build:ios-offline:no-ios` | 编译并复制，但不构建 iOS |

### 高级选项

脚本支持以下命令行选项：

```bash
# 只编译 UniApp
yarn build:ios-offline --build-only

# 只复制资源
yarn build:ios-offline --copy-only

# 跳过资源复制
yarn build:ios-offline --skip-copy

# 跳过 iOS 构建
yarn build:ios-offline --skip-ios

# 使用 Debug 配置
yarn build:ios-offline --configuration=Debug

# 构建模拟器版本
yarn build:ios-offline --sdk=iphonesimulator

# 查看帮助
yarn build:ios-offline --help
```

## 工作流程

### 1. 编译 UniApp

```bash
yarn build:app-ios
# 或
yarn build:ios-offline:build
```

输出目录：`dist/build/app-ios/`

### 2. 复制资源

资源会自动复制到：
```
../iOS/uniapp-kahe/Pandora/apps/__UNI__2BE2CDB/www/
```

AppID 会自动从 `src/manifest.json` 中读取。

### 3. 构建 iOS 项目

iOS 项目会被构建并生成归档文件：
```
../../build/ios/uniapp-kahe.xcarchive
```

## 配置说明

### AppID 配置

脚本会自动从 `src/manifest.json` 读取 `appid`。确保：

1. ✅ `src/manifest.json` 中的 `appid` 正确
2. ✅ `../iOS/uniapp-kahe/Pandora/apps/[AppID]/` 目录存在
3. ✅ `../iOS/uniapp-kahe/control.xml` 中的 `appid` 匹配

### 构建配置

- **Release**（默认）：生产环境构建
- **Debug**：开发调试构建

### SDK 类型

- **iphoneos**（默认）：真机版本
- **iphonesimulator**：模拟器版本

## 常见使用场景

### 场景 1：开发调试

```bash
# 编译并复制资源，但不构建 iOS（在 Xcode 中打开项目手动构建）
yarn build:ios-offline:no-ios
```

### 场景 2：只更新资源

如果只修改了 UniApp 代码，不需要重新构建 iOS：

```bash
# 编译并复制资源
yarn build:ios-offline:no-ios

# 然后在 Xcode 中重新运行项目
```

### 场景 3：完整打包

```bash
# 完整流程：编译 + 复制 + 构建
yarn build:ios-offline
```

### 场景 4：模拟器调试

```bash
# 构建模拟器版本
yarn build:ios-offline --sdk=iphonesimulator
```

## 输出位置

- **UniApp 编译输出**: `dist/build/app-ios/`
- **iOS 归档文件**: `../../build/ios/uniapp-kahe.xcarchive`
- **资源目录**: `../iOS/uniapp-kahe/Pandora/apps/__UNI__2BE2CDB/www/`

## 注意事项

1. **路径关系**：
   - `uni-kahe/` - UniApp 源码目录
   - `iOS/` - iOS 原生项目目录（与 uni-kahe 同级）

2. **AppID 一致性**：
   - 确保 manifest.json、control.xml 和 Pandora 目录中的 AppID 完全一致

3. **首次使用**：
   - 确保已安装依赖：`yarn install`
   - 确保 Xcode 已正确配置

4. **签名问题**：
   - 脚本默认禁用签名（用于快速构建）
   - 如需真机运行，请在 Xcode 中配置证书后手动构建

## 故障排除

### 问题 1：找不到 iOS 项目

**错误**：`iOS 项目不存在`

**解决**：确保项目结构正确：
```
kahe-uniapp/
├── uni-kahe/          # UniApp 源码
└── iOS/                # iOS 项目
    └── uniapp-kahe.xcodeproj
```

### 问题 2：资源复制失败

**错误**：`UniApp 编译输出目录不存在`

**解决**：
1. 先执行 `yarn build:app-ios` 编译 UniApp
2. 检查 `dist/build/app-ios/` 目录是否存在

### 问题 3：AppID 不匹配

**错误**：Pandora 目录不存在

**解决**：
1. 检查 `src/manifest.json` 中的 `appid`
2. 确保 `../iOS/uniapp-kahe/Pandora/apps/[AppID]/` 目录存在
3. 如果 AppID 已更改，需要手动创建对应的目录

### 问题 4：xcodebuild 命令失败

**错误**：`xcodebuild: command not found`

**解决**：
1. 确保已安装 Xcode
2. 确保 Xcode Command Line Tools 已安装：
   ```bash
   xcode-select --install
   ```

## 与根目录脚本的区别

项目根目录的 `build-ios.sh` 脚本功能类似，但：

- **根目录脚本** (`build-ios.sh`)：
  - 从项目根目录执行
  - 使用 bash 脚本
  - 适合 CI/CD 环境

- **uni-kahe 脚本** (`yarn build:ios-offline`)：
  - 从 uni-kahe 目录执行
  - 使用 Node.js 脚本
  - 集成到 package.json
  - 自动读取 manifest.json 中的 AppID
  - 更适合日常开发

## 相关文件

- `scripts/build-ios-offline.js` - iOS 离线打包脚本
- `package.json` - npm 脚本配置
- `src/manifest.json` - UniApp 配置文件
- `../iOS/uniapp-kahe.xcodeproj` - iOS 项目文件
- `../iOS/uniapp-kahe/Pandora/` - UniApp 离线资源目录
