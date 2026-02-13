# iOS 原生过渡页面改动总结

## 改动对比

### 原启动流程
```
LaunchScreen → UniApp loading → UniApp 页面
     ↑              ↑
   系统默认      白屏/黑屏等待
```

### 新启动流程
```
LaunchScreen → 原生过渡页 → UniApp 页面
     ↑              ↑
   系统默认    渐变背景+进度条+动画
               （同时预加载 UniApp）
```

## 文件改动详情

### 新增文件
| 文件 | 说明 |
|------|------|
| `KHTransitionViewController.h/m` | 原生过渡页面控制器 |

### 修改文件
| 文件 | 改动内容 |
|------|----------|
| `AppDelegate.m` | 添加 `showTransitionRoot` 方法，实现预加载逻辑 |
| `ViewController.m` | 修改 `viewDidAppear` 立即关闭 loading page |

## 核心代码变化

### AppDelegate.m
```objc
// 旧代码：直接显示 UniApp
if ([self isNetworkReachable]) {
    [self showUniAppRoot];
} else {
    [self showOfflineRoot];
}

// 新代码：显示过渡页面并预加载
[self showTransitionRoot];
```

### ViewController.m
```objc
// 旧代码：延迟 2 秒后关闭 loading
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), ...

// 新代码：立即关闭 loading（因为预加载已完成）
if (engine && ![engine isSplashPageClosed]) {
    [engine closeLoadingPage];
}
```

## 效果提升

| 方面 | 改动前 | 改动后 |
|------|--------|--------|
| 启动体验 | 白屏/黑屏等待 | 渐变背景 + 动画 |
| 用户感知 | 卡顿感 | 流畅的进度反馈 |
| 品牌展示 | 无 | Logo + 应用名称 |
| 加载时间 | 感觉更长 | 感觉更短（有进度反馈）|
| 网络处理 | 直接失败 | 优雅的离线页面 |

## 技术要点

1. **后台预加载**：UniApp 引擎在后台线程启动
2. **进度模拟**：分阶段模拟加载进度，给用户反馈
3. **线程安全**：所有 UI 更新都在主线程执行
4. **内存管理**：过渡页面自动释放
5. **超时保护**：最多等待 5 秒，避免无限等待

## 测试检查清单

- [ ] 启动应用，观察渐变背景是否正常显示
- [ ] 检查 Logo 动画是否正常播放
- [ ] 检查进度条是否正常更新
- [ ] 检查状态文字是否正常切换
- [ ] 观察过渡动画是否流畅
- [ ] 测试离线模式（关闭网络后启动）
- [ ] 测试快速启动（修改 delay 为最小值）
- [ ] 检查内存使用是否正常

## 回滚方法

如果需要回滚到原来的启动方式：

1. 打开 `AppDelegate.m`
2. 找到 `application:didFinishLaunchingWithOptions:` 方法
3. 将：
```objc
[self showTransitionRoot];
```
改为：
```objc
if ([self isNetworkReachable]) {
    [self showUniAppRoot];
} else {
    [self showOfflineRoot];
}
```
4. 重新编译
