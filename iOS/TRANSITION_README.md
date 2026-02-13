# iOS 原生过渡页面 - 完整使用指南

## 效果预览

启动流程：
1. **LaunchScreen** - 系统启动图
2. **原生过渡页** - 渐变背景 + Logo + 进度条 + 加载动画
3. **丝滑过渡** - 淡出原生页面，淡入 UniApp

## 已实现功能

### 视觉效果
- ✅ 渐变背景（温馨的浅黄色到浅橙色）
- ✅ Logo 弹性入场动画
- ✅ 标题滑入动画
- ✅ 进度条 shimmer 闪光效果
- ✅ 平滑的状态文字切换
- ✅ 丝滑的过渡动画

### 功能特性
- ✅ 后台预加载 UniApp 引擎
- ✅ 模拟加载进度阶段
- ✅ 网络检测和离线页面跳转
- ✅ 最小显示时间控制（避免闪屏）
- ✅ 超时保护机制

## 文件清单

```
iOS/uniapp-kahe/
├── Modules/Transition/
│   ├── KHTransitionViewController.h    # 头文件
│   └── KHTransitionViewController.m    # 实现文件
├── AppDelegate.m                        # 已修改：添加预加载逻辑
├── ViewController.m                     # 已修改：适配预加载模式
└── TRANSITION_README.md                 # 本文档
```

## 集成步骤

### 1. 确保文件已添加
检查以下文件是否存在于项目中：
- `KHTransitionViewController.h`
- `KHTransitionViewController.m`

### 2. 检查 AppDelegate.m 修改
确认 `application:didFinishLaunchingWithOptions:` 方法中调用了：
```objc
[self showTransitionRoot];
```

### 3. 添加资源图片（可选）
在 `Assets.xcassets` 中添加：
- `app-logo` - 应用 Logo（建议尺寸 120x120）

如果没有图片，需要修改代码使用默认 Logo。

## 自定义配置

### 修改应用名称
在 `KHTransitionViewController.m` 中：
```objc
self.titleLabel.text = @"你的应用名称";
self.subtitleLabel.text = @"你的副标题";
```

### 修改渐变背景色
```objc
self.gradientLayer.colors = @[
    (__bridge id)[UIColor colorWithRed:1.0 green:0.97 blue:0.9 alpha:1.0].CGColor,
    (__bridge id)[UIColor colorWithRed:1.0 green:0.94 blue:0.88 alpha:1.0].CGColor,
    (__bridge id)[UIColor colorWithRed:1.0 green:0.92 blue:0.85 alpha:1.0].CGColor
];
```

### 修改加载阶段
在 `AppDelegate.m` 的 `simulateLoadingStages` 方法中：
```objc
NSArray *stages = @[
    @{ @"progress": @0.1, @"text": @"正在初始化...", @"delay": @0.3 },
    @{ @"progress": @0.3, @"text": @"加载资源...", @"delay": @0.5 },
    // 添加更多阶段...
];
```

### 修改动画时长
入场动画：
```objc
[UIView animateWithDuration:0.7  // 修改此处// ...
```

过渡动画：
```objc
[UIView animateWithDuration:0.4  // 修改此处
// ...
```

## 编译检查

### 可能的错误及解决方案

#### 1. "app-logo" 图片未找到
**解决**：在 `Assets.xcassets` 中添加图片，或修改代码：
```objc
// 使用系统默认图标
self.logoImageView.image = [UIImage systemImageNamed:@"app.fill"];
// 或隐藏 Logo
self.logoImageView.hidden = YES;
```

#### 2. KHLogPlugin 相关错误
**解决**：如果不需要日志插件，注释掉相关代码：
```objc
// [KHLogPlugin sharedPlugin];
// NSLog(@"[AppDelegate] 日志插件已初始化");
```

#### 3. Swift 桥接文件错误
**解决**：确保项目已配置 Swift 桥接头文件。

## 性能优化

### 减少加载时间
1. 减少 `simulateLoadingStages` 中的 `delay` 值
2. 减少 `waitForUniAppReady` 中的 `maxWaitCount`
3. 移除不必要的加载阶段

### 最小显示时间
确保用户能看到过渡页面（避免闪屏）：
```objc
// 在 waitForUniAppReady 中
[NSThread sleepForTimeInterval:0.5];  // 至少显示 0.5 秒
```

## 调试技巧

### 查看日志
在 Xcode 控制台中过滤关键字：
- `[Transition]` - 过渡页面相关
- `[AppDelegate]` - 应用启动相关

### 测试离线模式
1. 关闭设备网络
2. 启动应用
3. 应显示离线页面

### 测试快速加载
修改所有 delay 为 0.1，观察过渡效果是否流畅。

## 回退到原始启动方式

如果出现问题，可以回退：

1. 打开 `AppDelegate.m`
2. 找到 `application:didFinishLaunchingWithOptions:`
3. 注释掉：
```objc
// [self showTransitionRoot];
```
4. 取消注释：
```objc
if ([self isNetworkReachable]) {
    [self showUniAppRoot];
} else {
    [self showOfflineRoot];
}
```

## 常见问题

### Q: 过渡页面显示时间太长？
A: 修改 `simulateLoadingStages` 中的 delay 值，或减少加载阶段数量。

### Q: 过渡页面显示时间太短？
A: 增加 `waitForUniAppReady` 中的 `sleepForTimeInterval` 值。

### Q: UniApp 加载完成后没有立即显示？
A: 检查 `waitForUniAppReady` 方法中的轮询逻辑，确保正确检测到 UniApp 就绪状态。

### Q: 动画卡顿？
A: 确保所有 UI 更新都在主线程执行。检查是否有阻塞主线程的操作。

## 进阶优化

### 添加启动广告
可以在过渡页面添加广告位，在 `KHTransitionViewController` 中添加：
```objc
@property (nonatomic, strong) UIImageView *adImageView;
```

### 添加版本号显示
```objc
UILabel *versionLabel = [[UILabel alloc] init];
versionLabel.text = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
// ... 添加约束
```

### 添加动画 Logo
可以使用 Lottie 动画替代静态 Logo：
```objc
#import <Lottie/Lottie.h>
// ...
LOTAnimationView *animationView = [LOTAnimationView animationNamed:@"logo_animation"];
```
