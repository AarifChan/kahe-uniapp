# iOS 原生过渡页面 - 使用指南

## 功能概述

实现了以下启动流程：

1. **LaunchScreen** - 系统启动图（保持不变）
2. **原生过渡页面** - 显示 Logo、进度条、加载状态
3. **后台预加载** - 同时加载 UniApp 引擎
4. **丝滑过渡** - 加载完成后平滑过渡到 UniApp

## 文件结构

```
iOS/uniapp-kahe/
├── Modules/
│   └── Transition/
│       ├── KHTransitionViewController.h    # 过渡页面头文件
│       └── KHTransitionViewController.m    # 过渡页面实现
├── AppDelegate.m                           # 修改：预加载逻辑
└── ViewController.m                        # 修改：适配预加载
```

## 动画效果

### 入场动画
- Logo 弹性缩放进入 (0.6s)
- 标题淡入 (0.5s, delay 0.2s)
- 进度条和状态文字淡入 (0.4s, delay 0.4s)
- 进度条脉冲动画

### 加载进度
模拟真实加载阶段：
- 0% → 10%: 正在初始化... (0.3s)
- 10% → 25%: 加载资源... (0.5s)
- 25% → 45%: 启动引擎... (0.6s)
- 45% → 65%: 加载页面... (0.8s)
- 65% → 85%: 准备就绪... (0.4s)
- 85% → 100%: 完成

### 过渡动画
- Logo 放大淡出
- 其他元素同步淡出
- 0.4s 淡入淡出过场到 UniApp

## 配置修改

### 修改加载时间
在 `AppDelegate.m` 中调整 `simulateLoadingStages` 方法：

```objc
- (void)simulateLoadingStages {
    NSArray *stages = @[
        @{ @"progress": @0.1, @"text": @"正在初始化...", @"delay": @0.3 },
        // 修改 delay 值来调整每个阶段的停留时间
    ];
}
```

### 修改等待逻辑
在 `waitForUniAppReady` 方法中调整：

```objc
// 最多等待 5 秒
NSInteger maxWaitCount = 50;
// 每次检查间隔 0.1 秒
[NSThread sleepForTimeInterval:0.1];
// 最小显示时间
[NSThread sleepForTimeInterval:0.5];
```

### 修改过渡动画时长
在 `KHTransitionViewController.m` 中：

```objc
// 入场动画
[UIView animateWithDuration:0.6  // 修改此处
// ...

// 过渡动画
[UIView animateWithDuration:0.5  // 修改此处// ...
```

## 自定义 UI

### 修改 Logo
在 `Assets.xcassets` 中添加 `app-logo` 图片，或修改代码：

```objc
self.logoImageView.image = [UIImage imageNamed:@"your-logo-name"];
```

### 修改颜色
```objc
// 进度条颜色
self.progressView.progressTintColor = [UIColor colorWithRed:1.0 green:0.8 blue:0.4 alpha:1.0];

// 背景颜色
self.view.backgroundColor = [UIColor whiteColor];
```

### 修改文字
```objc
self.titleLabel.text = @"你的应用名称";
```

## 网络处理

### 无网络情况
- 检测到无网络时，自动跳转到离线页面
- 用户点击"重试"后重新检测网络

### 弱网优化
- 增加超时检测（最多等待 5 秒）
- 即使 UniApp 未完全准备好，也会强制进入（避免无限等待）

## 注意事项

1. **最小显示时间**: 过渡页面至少显示 2 秒，避免闪屏
2. **后台加载**: UniApp 引擎在后台线程预加载
3. **线程安全**: UI 更新都在主线程执行
4. **内存管理**: 过渡页面在切换后会自动释放

## 回退方案

如果需要恢复到原始启动方式，修改 `AppDelegate.m`：

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ... 原有代码 ...
    
    // 注释掉这行
    // [self showTransitionRoot];
    
    // 恢复为原来的逻辑
    if ([self isNetworkReachable]) {
        [self showUniAppRoot];
    } else {
        [self showOfflineRoot];
    }
    
    // ...
}
```
