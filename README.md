# Kahe UniApp iOS项目

基于SwiftUI和UniApp离线打包的iOS混合应用项目。

## 项目结构

```
kahe-uniapp/
├── iOS/                          # iOS原生项目
│   ├── KaheUniApp/              # SwiftUI主应用
│   │   ├── KaheUniAppApp.swift  # App入口
│   │   ├── ContentView.swift    # 主视图
│   │   ├── AppDelegate.swift    # AppDelegate（用于初始化UniMP SDK）
│   │   ├── UniAppContainerView.swift  # UniApp容器视图
│   │   └── KaheUniApp-Bridging-Header.h  # 桥接头文件
│   └── Pandora/                 # UniApp离线资源目录（Folder Reference）
│       ├── control.xml          # UniApp配置
│       └── apps/                # UniApp应用资源
│           └── [AppID]/         # 具体的UniApp应用ID
│               └── www/         # UniApp的www目录
└── UniApp/                      # UniApp源码（Vue 3项目）
    └── ...                      # UniApp项目文件
```

## 重要说明

### 1. Pandora目录配置

- **Pandora目录必须作为"Folder Reference"（蓝色文件夹）添加到Xcode项目**
- 不要作为Group（黄色文件夹），否则资源文件不会被复制到应用包
- 目录结构必须匹配：`Pandora/apps/[AppID]/www/`

### 2. UniMP SDK集成

本项目需要集成DCloud的UniMP SDK：

1. 将UniMP SDK框架添加到项目中
2. 在`KaheUniApp-Bridging-Header.h`中导入SDK头文件：
   ```objc
   #import "DCUniMP.h"
   #import "DCUniMPSDKEngine.h"
   ```
3. 在Xcode的Build Settings中配置Bridging Header路径
4. 在`AppDelegate.swift`中取消注释SDK初始化代码

### 3. Xcode项目配置

- **Bitcode**: 设置为 `NO`
- **Other Linker Flags**: 添加 `-ObjC`
- **Bridging Header**: 设置为 `KaheUniApp/KaheUniApp-Bridging-Header.h`

### 4. Info.plist配置

需要添加以下权限描述（参考`uniapp-kahe-Info.plist`）：

- `NSCameraUsageDescription`: 照相机权限
- `NSPhotoLibraryUsageDescription`: 相册权限
- `NSLocationWhenInUseUsageDescription`: 定位权限
- `NSMicrophoneUsageDescription`: 麦克风权限
- `NSContactsUsageDescription`: 通讯录权限

## 开发步骤

1. **创建Xcode项目**
   - 使用SwiftUI作为界面框架
   - 项目名称：KaheUniApp

2. **添加现有文件到项目**
   - 将`iOS/KaheUniApp/`目录下的文件添加到项目
   - 将`iOS/Pandora/`作为Folder Reference添加

3. **集成UniMP SDK**
   - 从DCloud官网下载UniMP SDK
   - 将SDK框架添加到项目
   - 配置桥接头文件

4. **配置UniApp资源**
   - 将编译好的UniApp资源复制到`Pandora/apps/[AppID]/www/`
   - 确保`control.xml`中的AppID与manifest.json一致

5. **编译运行**
   - 在Xcode中编译并运行项目

## 参考项目

本项目参考了 `/Users/fuqiang/Project/aarif/jmcw/4.87/SDK/HBuilder-Hello` 项目的结构。

## 注意事项

- 确保线程安全：UI更新必须在主线程进行
- 资源路径：如果出现白屏，检查Pandora是否作为Folder Reference添加
- AppID匹配：control.xml、manifest.json和应用目录名称必须一致