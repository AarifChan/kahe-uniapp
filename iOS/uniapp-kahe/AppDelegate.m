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
    if (@available(iOS 11.0, *)) {
        [UIApplication sharedApplication].keyWindow.rootViewController.view.insetsLayoutMarginsFromSafeArea = NO;
    }

    return reachable && !connectionRequired;
}

#pragma mark - Transition Flow

/// 显示原生过渡页面并开始预加载
- (void)showTransitionRoot {
    self.transitionVC = [[KHTransitionViewController alloc] init];
    
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:self.transitionVC];
    nav.navigationBarHidden = YES;
    self.rootViewController = nav;
    self.window.rootViewController = nav;
    
    // 开始预加载 UniApp
    [self preloadUniApp];
}

/// 后台预加载 UniApp
- (void)preloadUniApp {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        // 模拟加载阶段
        [self simulateLoadingStages];
        
        // 实际启动 UniApp 引擎（在后台进行）
        dispatch_async(dispatch_get_main_queue(), ^{
            [[PDRCore Instance] start];
            self.isEnginePreloaded = YES;
            NSLog(@"[Transition] UniApp 引擎预加载完成");
        });
        
        // 等待引擎初始化完成
        [self waitForUniAppReady];
    });
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
    
    // 等待引擎初始化（轮询检查）
    NSInteger maxWaitCount = 50; // 最多等待 5 秒
    NSInteger waitCount = 0;
    
    while (!self.isUniAppReady && waitCount < maxWaitCount) {
        [NSThread sleepForTimeInterval:0.1];
        waitCount++;
        
        // 检查 PDRCore 是否已准备好
        PDRCore *core = [PDRCore Instance];
        if (core && core.appManager && core.appManager.activeApp) {
            self.isUniAppReady = YES;
            break;
        }
    }
    
    // 确保至少显示 2 秒的过渡页面（避免闪屏）
    [NSThread sleepForTimeInterval:0.5];
    
    // 过渡到 UniApp
    dispatch_async(dispatch_get_main_queue(), ^{
        [self transitionToUniApp];
    });
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
        
        if ([strongSelf isNetworkReachable]) {
            [strongSelf showTransitionRoot];
        } else {
            [vc updateStatusText:@"当前网络仍不可用，请检查后重试"];
        }
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
        
        if ([strongSelf isNetworkReachable]) {
            [strongSelf showTransitionRoot];
        } else {
            [vc updateStatusText:@"当前网络仍不可用，请检查后重试"];
        }
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
