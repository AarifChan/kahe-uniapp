# UniApp Android 离线打包方案

## 项目信息

- **AppID**: `__UNI__2BE2CDB`
- **包名**: `com.jmcw.kahe`
- **AppKey**: `bb8cbc87d252fb0887a22e0c65d9d296`
- **官方 SDK**: `/Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128`

## 目录结构

```
kahe-uniapp/
├── uni-kahe/              # UniApp 源码目录
│   ├── src/               # 源代码
│   ├── dist/build/app/    # 编译输出（Android 资源）
│   └── package.json       # 构建脚本
├── android/               # Android 原生项目
│   ├── app/src/main/assets/apps/__UNI__2BE2CDB/www/  # UniApp 资源
│   └── app/build.gradle   # 构建配置
└── scripts/               # 打包脚本
    ├── build-android-offline.sh  # 主打包脚本
    └── fix-android-project.sh    # 项目修复脚本
```

## 问题分析

### 根本原因
UniApp `yarn build:app-android` 编译输出缺少以下关键文件：
1. `__uniappes6.js` - ES6 polyfill，用于兼容旧版 Android WebView
2. `app-view.js` - View 层入口脚本
3. `__uniappview.html` - View 层 HTML 模板
4. `view.css` / `view.umd.min.js` - View 层资源

### 解决方案
从官方 Demo (`HBuilder-HelloUniApp`) 复制缺失的必要文件到编译输出目录。

## 打包流程

### 方式一：使用自动化脚本（推荐）

```bash
# 进入项目根目录
cd /Users/fuqiang/Project/aarif/jmcw/kahe-uniapp

# 完整流程：编译 + 同步 + 构建 Debug APK
./scripts/build-android-offline.sh -b

# 完整流程 + 安装到设备
./scripts/build-android-offline.sh -b -i

# 构建 Release APK
./scripts/build-android-offline.sh -b -r

# 仅编译 UniApp
./scripts/build-android-offline.sh -c

# 仅同步资源（当 UniApp 已编译时）
./scripts/build-android-offline.sh -s

# 仅构建 APK（不编译 UniApp）
./scripts/build-android-offline.sh -a
```

### 方式二：手动步骤

#### 步骤 1: 编译 UniApp

```bash
cd uni-kahe
yarn build:app-android
```

#### 步骤 2: 同步资源

```bash
# 复制编译输出到 Android 项目
rsync -av --delete uni-kahe/dist/build/app/ android/app/src/main/assets/apps/__UNI__2BE2CDB/www/

# 复制官方 Demo 的必要文件（如果缺失）
cp /Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www/__uniappes6.js \
   android/app/src/main/assets/apps/__UNI__2BE2CDB/www/

cp /Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www/app-view.js \
   android/app/src/main/assets/apps/__UNI__2BE2CDB/www/

cp /Users/fuqiang/Downloads/最新版/4.87/Android-SDK@4.87.82540_20251128/HBuilder-HelloUniApp/app/src/main/assets/apps/__UNI__B/www/__uniappview.html \
   android/app/src/main/assets/apps/__UNI__2BE2CDB/www/
```

#### 步骤 3: 修复配置文件

```bash
./scripts/fix-android-project.sh
```

#### 步骤 4: 构建 APK

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

## 配置文件说明

### AndroidManifest.xml 关键配置

```xml
<!-- AppKey 配置 -->
<meta-data
    android:name="dcloud_appkey"
    android:value="bb8cbc87d252fb0887a22e0c65d9d296" />

<!-- 启动 Activity -->
<activity
    android:name="io.dcloud.PandoraEntry"
    android:configChanges="orientation|keyboardHidden|keyboard|navigation"
    android:launchMode="singleTask"
    android:theme="@style/TranslucentTheme"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

### build.gradle 关键配置

```gradle
android {
    namespace 'com.jmcw.kahe'
    compileSdkVersion 35
    buildToolsVersion '35.0.0'
    
    defaultConfig {
        applicationId "com.jmcw.kahe"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        
        manifestPlaceholders = [
            "apk.applicationId"     : "com.jmcw.kahe",
            "GETUI_APPID"           : "",
            "plus.unipush.appid"    : "",
            "plus.unipush.appkey"   : "",
            "plus.unipush.appsecret": ""
        ]
    }
    
    // UniApp 必需配置
    aaptOptions {
        additionalParameters '--auto-add-overlay'
        ignoreAssetsPattern "!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~"
    }
}
```

### dcloud_control.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.81635">
<apps>
    <app appid="__UNI__2BE2CDB" appver="1.0.0"/>
</apps>
</hbuilder>
```

## 重要文件清单

Android 项目必须包含以下文件才能正常运行：

### 必需资源文件（在 `app/src/main/assets/apps/__UNI__2BE2CDB/www/` 中）

| 文件 | 说明 | 来源 |
|------|------|------|
| `__uniappes6.js` | ES6 polyfill | 官方 Demo |
| `app-view.js` | View 层入口 | 官方 Demo |
| `__uniappview.html` | View 层 HTML | 官方 Demo |
| `view.css` | View 层样式 | UniApp 编译输出 / app.css 复制 |
| `view.umd.min.js` | View 层 JS | UniApp 编译输出 / uni-app-view.umd.js 复制 |
| `app-service.js` | Service 层 JS | UniApp 编译输出 |
| `app-config.js` | 应用配置 | UniApp 编译输出 |
| `manifest.json` | 应用清单 | UniApp 编译输出 |
| `pages/` | 页面目录 | UniApp 编译输出 |
| `static/` | 静态资源 | UniApp 编译输出 |

### 配置文件

| 文件 | 说明 |
|------|------|
| `app/src/main/assets/data/dcloud_control.xml` | DCloud 控制配置 |
| `app/src/main/AndroidManifest.xml` | Android 应用清单 |
| `app/build.gradle` | Gradle 构建配置 |

## 后续维护

### 更新 UniApp 代码后

```bash
# 使用脚本一键打包
./scripts/build-android-offline.sh -b -i
```

### 仅更新 Android 原生代码

```bash
cd android
./gradlew assembleDebug
```

### 修复项目配置

如果项目配置出现问题（如缺失必要文件）：

```bash
./scripts/fix-android-project.sh
```

## 常见问题

### Q1: 启动卡在闪屏页
**原因**: `__uniappes6.js` 或 `app-view.js` 缺失
**解决**: 运行 `./scripts/fix-android-project.sh`

### Q2: 提示 "未配置 appkey"
**原因**: AndroidManifest.xml 中的 AppKey 配置错误
**解决**: 检查 `android:name="dcloud_appkey"` 的 `android:value` 是否为 `bb8cbc87d252fb0887a22e0c65d9d296`

### Q3: 包名冲突
**原因**: manifest.json 和 build.gradle 中的包名不一致
**解决**: 确保两处都使用 `com.jmcw.kahe`

## SDK 升级

当需要升级 UniApp SDK 时：

1. 下载新版本的 Android SDK
2. 更新 `SDK_DIR` 变量指向新 SDK 路径
3. 重新运行修复脚本获取新的必要文件
4. 测试并验证功能

## 参考文档

- [UniApp Android 离线打包官方文档](https://uniapp.dcloud.net.cn/tutorial/app-android-offline.html)
- [HBuilder-Integrate-AS 项目说明](https://uniapp.dcloud.net.cn/tutorial/app-android-offline-integrate.html)
