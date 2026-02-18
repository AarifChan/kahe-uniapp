//
//  AppDelegate.m
//  Pandora
//
//  Created by Mac Pro_C on 12-12-26.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import "AppDelegate.h"
#import "PDRCore.h"
#import "PDRCommonString.h"
#import "ViewController.h"
#import "OfflineViewController.h"
#import "PDRCoreApp.h"
#import "PDRCoreAppManager.h"

// Swift 自动生成的头文件
#import "uniapp_kahe-Swift.h"

// Objective-C 原生模块
#import "KHDeviceHelper.h"
#import "KHLogPlugin.h"

// 过渡页面
#import "KHTransitionViewController.h"

#import <SystemConfiguration/SystemConfiguration.h>
#import <netinet/in.h>
#import <WebKit/WebKit.h>

#import "KHLogPlugin.h"
#import "KHLogPluginBridge.h"

@interface AppDelegate()<PDRCoreDelegate>
@property (strong, nonatomic) ViewController *h5ViewContoller;
@property (strong, nonatomic) KHTransitionViewController *transitionVC;
@property (assign, nonatomic) BOOL didStartUniApp;
@property (assign, nonatomic) BOOL isUniAppReady;
@end

@implementation AppDelegate

@synthesize window = _window;
@synthesize rootViewController;

#pragma mark - App Lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // 0. 注册 UserDefaults 默认值
    [[NSUserDefaults standardUserDefaults] registerDefaults:@{
        @"kahe_launch_debug_mode": @NO,
        @"KHAppLaunchCount": @0
    }];
    
    // 增加启动计数
    NSInteger launchCount = [[NSUserDefaults standardUserDefaults] integerForKey:@"KHAppLaunchCount"];
    [[NSUserDefaults standardUserDefaults] setInteger:launchCount + 1 forKey:@"KHAppLaunchCount"];
    [[NSUserDefaults standardUserDefaults] synchronize];

    // 1. 初始化原生功能模块
    [self setupNativeFeatures];

    // 2. 初始化 UniApp 引擎（仅初始化，不绑定视图）
    BOOL ret = [PDRCore initEngineWihtOptions:launchOptions
                                  withRunMode:PDRCoreRunModeNormal withDelegate:self];

    UIWindow *window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window = window;

    // 3. 显示原生过渡页面，同时后台预加载 UniApp
    [self showTransitionRoot];

    [self.window makeKeyAndVisible];
    return ret;
}

-(BOOL)getStatusBarHidden {
    if (self.h5ViewContoller) {
        return [self.h5ViewContoller getStatusBarHidden];
    }
    return NO;
}

-(UIStatusBarStyle)getStatusBarStyle {
    if (self.h5ViewContoller) {
        return [self.h5ViewContoller getStatusBarStyle];
    }
    return UIStatusBarStyleDefault;
}

-(void)setStatusBarStyle:(UIStatusBarStyle)statusBarStyle {
    if (self.h5ViewContoller) {
        [self.h5ViewContoller setStatusBarStyle:statusBarStyle];
    }
}

-(void)wantsFullScreen:(BOOL)fullScreen
{
    if (self.h5ViewContoller) {
        [self.h5ViewContoller wantsFullScreen:fullScreen];
    }
}

#pragma mark - Native Features

- (void)setupNativeFeatures {
    // 初始化网络监控
    [[KHNetworkMonitor shared] startMonitoring];
    
    // 初始化数据存储
    [KHDataStore shared];
    
    // 初始化功能管理器
    [KHFeatureManager shared];
    
    // 预加载设备信息
    NSDictionary *deviceInfo = [[KHFeatureManager shared] getDeviceInfo];
    NSLog(@"[AppDelegate] 设备信息: %@", deviceInfo);
    
    // 使用 Objective-C 设备辅助类获取更详细信息
    KHDeviceHelper *deviceHelper = [KHDeviceHelper sharedHelper];
    NSDictionary *detailInfo = [deviceHelper detailedDeviceInfo];
    NSLog(@"[AppDelegate] 详细设备信息: %@", detailInfo);
    
    // 初始化日志插件
    [KHLogPlugin sharedPlugin];
    NSLog(@"[AppDelegate] 日志插件已初始化");
    
    // 监听网络状态变化通知
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleNetworkStatusChanged:)
                                                 name:@"KHNetworkStatusChanged"
                                               object:nil];
}

- (void)handleNetworkStatusChanged:(NSNotification *)notification {
    BOOL connected = [notification.userInfo[@"connected"] boolValue];
    NSInteger typeValue = [notification.userInfo[@"type"] integerValue];
    
    NSString *typeString = @"未知";
    switch (typeValue) {
        case 1:
            typeString = @"WiFi";
            break;
        case 2:
            typeString = @"蜂窝网络";
            break;
        case 3:
            typeString = @"以太网";
            break;
        default:
            break;
    }
    NSLog(@"[AppDelegate] 网络状态变化: %@, 类型: %@", connected ? @"已连接" : @"已断开", typeString);
    
    // 如果网络已连接，且当前在离线页面，自动重试加载
    if (connected && [self isCurrentlyOffline]) {
        NSLog(@"[AppDelegate] 网络已恢复，自动重试加载");
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self showTransitionRoot];
        });
    }
}

/// 检查当前是否处于离线页面
- (BOOL)isCurrentlyOffline {
    UIViewController *rootVC = self.window.rootViewController;
    if ([rootVC isKindOfClass:[UINavigationController class]]) {
        UINavigationController *nav = (UINavigationController *)rootVC;
        UIViewController *topVC = nav.topViewController;
        return [topVC isKindOfClass:[OfflineViewController class]];
    }
    return NO;
}

#pragma mark - Network Check

- (BOOL)isNetworkReachable {
    struct sockaddr_in zeroAddress;
    bzero(&zeroAddress, sizeof(zeroAddress));
    zeroAddress.sin_len = sizeof(zeroAddress);
    zeroAddress.sin_family = AF_INET;

    SCNetworkReachabilityRef reachabilityRef = SCNetworkReachabilityCreateWithAddress(NULL, (const struct sockaddr *)&zeroAddress);
    if (!reachabilityRef) {
        return NO;
    }

    SCNetworkReachabilityFlags flags = 0;
    BOOL didGetFlags = SCNetworkReachabilityGetFlags(reachabilityRef, &flags);
    CFRelease(reachabilityRef);
    if (!didGetFlags) {
        return NO;
    }

    BOOL reachable = (flags & kSCNetworkReachabilityFlagsReachable) != 0;
    BOOL connectionRequired = (flags & kSCNetworkReachabilityFlagsConnectionRequired) != 0;

    BOOL canConnectAutomatically =
        ((flags & kSCNetworkReachabilityFlagsConnectionOnDemand) != 0) ||
        ((flags & kSCNetworkReachabilityFlagsConnectionOnTraffic) != 0);
    BOOL interventionNotRequired = (flags & kSCNetworkReachabilityFlagsInterventionRequired) == 0;
    if (canConnectAutomatically && interventionNotRequired) {
        connectionRequired = NO;
    }

    return reachable && !connectionRequired;
}

#pragma mark - Transition Flow

/// 显示原生过渡页面并开始预加载
- (void)showTransitionRoot {
    // 每次显示过渡页面时，先彻底重置状态（支持重新加载）
    [self resetUniAppState];
    
    self.transitionVC = [[KHTransitionViewController alloc] init];
    
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:self.transitionVC];
    nav.navigationBarHidden = YES;
    self.rootViewController = nav;
    self.window.rootViewController = nav;
    
    // 延迟 0.3 秒后开始预加载，确保缓存清理完成
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        [self preloadUniApp];
    });
}

/// 后台预加载 UniApp
- (void)preloadUniApp {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        // 模拟加载阶段
        [self simulateLoadingStages];
        
        // 使用信号量等待主线程完成引擎启动
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        
        // 实际启动 UniApp 引擎（在主线程执行）
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"[Transition] 启动 UniApp 引擎...");
            
            [[PDRCore Instance] start];
            self.isEnginePreloaded = YES;
            NSLog(@"[Transition] UniApp 引擎预加载完成");
            dispatch_semaphore_signal(semaphore);
        });
        
        // 等待引擎启动完成（最多等待3秒）
        dispatch_semaphore_wait(semaphore, dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3.0 * NSEC_PER_SEC)));
        
        // 等待引擎初始化完成
        [self waitForUniAppReady];
    });
}

/// 重置 UniApp 状态以支持重新加载
- (void)resetUniAppState {
    self.didStartUniApp = NO;
    self.isUniAppReady = NO;
    self.isEnginePreloaded = NO;
    
    // 清理旧的 ViewController（关键：这会清理关联的 WebView）
    if (self.h5ViewContoller) {
        // 找到并清理 WebView
        [self findAndCleanupWebViewInView:self.h5ViewContoller.view];
        [self.h5ViewContoller.view removeFromSuperview];
        self.h5ViewContoller = nil;
    }
    
    // 清理 PDRCore 相关设置
    PDRCore *core = [PDRCore Instance];
    if (core) {
        // 重置 presentViewController
        core.persentViewController = nil;
        
        // 清除 NSURLCache
        [[NSURLCache sharedURLCache] removeAllCachedResponses];
        
        // 清理 WKWebView 缓存（同步方式，iOS 9+）
        if (@available(iOS 9.0, *)) {
            NSSet *websiteDataTypes = [WKWebsiteDataStore allWebsiteDataTypes];
            NSDate *dateFrom = [NSDate dateWithTimeIntervalSince1970:0];
            [[WKWebsiteDataStore defaultDataStore] removeDataOfTypes:websiteDataTypes
                                                       modifiedSince:dateFrom
                                                   completionHandler:^{
                NSLog(@"[Transition] WKWebView 缓存已清理");
            }];
        }
        
        // 清理本地存储和 Cookie
        NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
        for (NSHTTPCookie *cookie in cookieStorage.cookies) {
            [cookieStorage deleteCookie:cookie];
        }
    }
    
    NSLog(@"[Transition] 已重置 UniApp 状态和 WebView 缓存");
}

/// 在视图中查找并清理 WebView
- (void)findAndCleanupWebViewInView:(UIView *)view {
    for (UIView *subview in view.subviews) {
        // 如果是 WKWebView，先停止加载并清理
        if ([subview isKindOfClass:[WKWebView class]]) {
            WKWebView *webView = (WKWebView *)subview;
            [webView stopLoading];
            webView.navigationDelegate = nil;
            webView.UIDelegate = nil;
            NSLog(@"[Transition] 清理 WKWebView");
        }
        // 递归查找
        [self findAndCleanupWebViewInView:subview];
    }
}

/// 模拟加载阶段（用于展示进度）
- (void)simulateLoadingStages {
    NSArray *stages = @[
        @{ @"progress": @0.1, @"text": @"正在初始化...", @"delay": @0.3 },
        @{ @"progress": @0.25, @"text": @"加载资源...", @"delay": @0.5 },
        @{ @"progress": @0.45, @"text": @"启动引擎...", @"delay": @0.6 },
        @{ @"progress": @0.65, @"text": @"加载页面...", @"delay": @0.8 },
        @{ @"progress": @0.85, @"text": @"准备就绪...", @"delay": @0.4 }
    ];
    
    for (NSDictionary *stage in stages) {
        CGFloat progress = [stage[@"progress"] floatValue];
        NSString *text = stage[@"text"];
        NSTimeInterval delay = [stage[@"delay"] doubleValue];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.transitionVC updateProgress:progress];
            [self.transitionVC updateStatusText:text];
        });
        
        [NSThread sleepForTimeInterval:delay];
    }
}

/// 等待 UniApp 准备就绪
- (void)waitForUniAppReady {
    // 检查网络状态
    if (![self isNetworkReachable]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.transitionVC updateStatusText:@"网络连接失败"];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [self showOfflineFromTransition];
            });
        });
        return;
    }
    
    // 使用定时器在主线程轮询检查引擎状态（避免后台线程访问 PDRCore）
    __block NSInteger waitCount = 0;
    const NSInteger maxWaitCount = 50; // 最多等待 5 秒
    
    // 先等待至少 1.5 秒，让引擎有足够时间初始化
    [NSThread sleepForTimeInterval:1.5];
    
    // 切换到主线程检查状态
    dispatch_async(dispatch_get_main_queue(), ^{
        [self checkUniAppReadyWithCount:waitCount maxCount:maxWaitCount];
    });
}

/// 在主线程检查 UniApp 是否就绪（递归检查）
- (void)checkUniAppReadyWithCount:(NSInteger)count maxCount:(NSInteger)maxCount {
    if (count >= maxCount) {
        // 超时，直接过渡到 UniApp
        NSLog(@"[Transition] 等待引擎超时，强制过渡");
        [self transitionToUniApp];
        return;
    }
    
    // 在主线程检查 PDRCore 状态（线程安全）
    PDRCore *core = [PDRCore Instance];
    BOOL isReady = (core && core.appManager && core.appManager.activeApp);
    
    if (isReady) {
        self.isUniAppReady = YES;
        NSLog(@"[Transition] 引擎已就绪，准备过渡");
        // 再等待 0.5 秒确保 UI 渲染完成
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self transitionToUniApp];
        });
    } else {
        // 0.1 秒后再次检查
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self checkUniAppReadyWithCount:count + 1 maxCount:maxCount];
        });
    }
}

/// 执行过渡到 UniApp
- (void)transitionToUniApp {
    // 创建 UniApp 视图控制器
    ViewController *viewController = [[ViewController alloc] init];
    self.h5ViewContoller = viewController;
    
    // 设置不显示默认 loading（因为我们已经用原生页面替代了）
    viewController.showLoadingView = NO;
    
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:viewController];
    navigationController.navigationBarHidden = YES;
    
    // 执行过渡动画
    [self.transitionVC transitionToUniAppWithCompletion:^{
        // 动画完成后切换 rootViewController
        self.rootViewController = navigationController;
        
        // 使用更平滑的过渡动画
        [UIView transitionWithView:self.window
                          duration:0.4
                           options:UIViewAnimationOptionTransitionCrossDissolve | UIViewAnimationOptionCurveEaseInOut
                        animations:^{
            self.window.rootViewController = navigationController;
        } completion:^(BOOL finished) {
            self.didStartUniApp = YES;
            NSLog(@"[Transition] 已切换到 UniApp");
        }];
    }];
}

/// 从过渡页面显示离线页面
- (void)showOfflineFromTransition {
    __weak typeof(self) weakSelf = self;
    
    OfflineViewController *vc = [[OfflineViewController alloc] init];
    vc.onRetry = ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) { return; }
        
        // 延迟重试，给用户时间去允许网络权限
        [vc updateStatusText:@"正在检查网络..."];
        [vc setRetryEnabled:NO];
        
        // 延迟 0.5 秒后重试，因为用户可能在权限弹窗中刚刚点击"允许"
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [strongSelf attemptReloadWithRetryCount:3 fromViewController:vc];
        });
    };
    
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
    nav.navigationBarHidden = YES;
    
    [UIView transitionWithView:self.window
                      duration:0.3
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^{
        self.window.rootViewController = nav;
    } completion:nil];
    
    self.rootViewController = nav;
}

/// 尝试重新加载，带重试机制
- (void)attemptReloadWithRetryCount:(NSInteger)retryCount fromViewController:(OfflineViewController *)vc {
    if ([self isNetworkReachable]) {
        // 网络可用，重新加载 UniApp
        NSLog(@"[Reload] 网络已恢复，重新加载 UniApp");
        [self showTransitionRoot];
    } else if (retryCount > 0) {
        // 网络仍不可用，延迟后重试
        NSLog(@"[Reload] 网络不可用，%ld 秒后重试 (剩余 %ld 次)", (long)1, (long)retryCount);
        [vc updateStatusText:[NSString stringWithFormat:@"网络连接中... (%ld)", (long)retryCount]];
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self attemptReloadWithRetryCount:retryCount - 1 fromViewController:vc];
        });
    } else {
        // 重试次数用完，提示用户
        NSLog(@"[Reload] 网络检查失败，提示用户");
        [vc updateStatusText:@"当前网络仍不可用，请检查网络设置后重试"];
        [vc setRetryEnabled:YES];
    }
}

#pragma mark - Original Methods (Kept for compatibility)

- (void)startMainApp {
    dispatch_async(dispatch_get_main_queue(), ^(void) {
        [[PDRCore Instance] start];
    });
}

/// 从调试页面切换到 UniApp
- (void)switchToUniApp {
    if ([self isNetworkReachable]) {
        [self showTransitionRoot];
    } else {
        [self showOfflineRoot];
    }
}

- (void)showOfflineRoot {
    __weak typeof(self) weakSelf = self;
    
    OfflineViewController *vc = [[OfflineViewController alloc] init];
    vc.onRetry = ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) { return; }
        
        // 延迟重试，给用户时间去允许网络权限
        [vc updateStatusText:@"正在检查网络..."];
        [vc setRetryEnabled:NO];
        
        // 延迟 0.5 秒后重试
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [strongSelf attemptReloadWithRetryCount:3 fromViewController:vc];
        });
    };
    
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
    nav.navigationBarHidden = YES;
    self.rootViewController = nav;
    self.window.rootViewController = nav;
}

- (void)showUniAppRoot {
    if (self.didStartUniApp) {
        // 已启动过，直接切换
    }

    ViewController *viewController = [[ViewController alloc] init];
    self.h5ViewContoller = viewController;

    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:viewController];
    navigationController.navigationBarHidden = YES;
    self.rootViewController = navigationController;
    self.window.rootViewController = navigationController;

    if (!self.didStartUniApp) {
        self.didStartUniApp = YES;
        [self startMainApp];
    }

    self.h5ViewContoller.showLoadingView = !self.isEnginePreloaded;
}

#pragma mark - App Events

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem
  completionHandler:(void(^)(BOOL succeeded))completionHandler{
    [PDRCore handleSysEvent:PDRCoreSysEventPeekQuickAction withObject:shortcutItem];
    completionHandler(true);
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventBecomeActive withObject:nil];
    }
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventResignActive withObject:nil];
    }
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventEnterBackground withObject:nil];
    }
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventEnterForeGround withObject:nil];
    }
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [PDRCore destoryEngine];
}

#pragma mark - URL Handling

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    [self application:application handleOpenURL:url];
    return YES;
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    [PDRCore handleSysEvent:PDRCoreSysEventOpenURL withObject:url];
    return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [PDRCore handleSysEvent:PDRCoreSysEventOpenURLWithOptions withObject:@[url,options]];
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void(^)(NSArray<id<UIUserActivityRestoring>> * __nullable restorableObjects))restorationHandler {
    [PDRCore handleSysEvent:PDRCoreSysEventContinueUserActivity withObject:userActivity];
    restorationHandler(nil);
    return YES;
}

@end

@implementation UINavigationController(Orient)

-(BOOL)shouldAutorotate{
    return ![PDRCore Instance].lockScreen;
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations{
    if([self.topViewController isKindOfClass:[ViewController class]])
        return [self.topViewController supportedInterfaceOrientations];
    return UIInterfaceOrientationMaskPortrait;
}
@end
