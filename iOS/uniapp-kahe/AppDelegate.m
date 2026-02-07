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

// Swift 自动生成的头文件，用于访问 KHDebugViewFactory（SwiftUI 调试页面工厂）
// 注意：头文件名称 = "$(PRODUCT_MODULE_NAME)-Swift.h"，'-' 会替换为 '_'
#import "uniapp_kahe-Swift.h"

#import <SystemConfiguration/SystemConfiguration.h>
#import <netinet/in.h>


@interface AppDelegate()<PDRCoreDelegate>
@property (strong, nonatomic) ViewController *h5ViewContoller;
@property (assign, nonatomic) BOOL didStartUniApp;
@end

@implementation AppDelegate

@synthesize window = _window;
@synthesize rootViewController;
#pragma mark -
#pragma mark app lifecycle
/*
 * @Summary:程序启动时收到push消息
 */
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // 0. 注册 UserDefaults 默认值（首次安装时 debug 模式默认开启）
    [[NSUserDefaults standardUserDefaults] registerDefaults:@{
        @"kahe_launch_debug_mode": @NO
    }];

    // 1. 初始化 UniApp 引擎（仅初始化，不绑定视图）
    BOOL ret = [PDRCore initEngineWihtOptions:launchOptions
                                  withRunMode:PDRCoreRunModeNormal withDelegate:self];

    UIWindow *window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window = window;

    // 2. 读取启动模式开关
    BOOL debugMode = [[NSUserDefaults standardUserDefaults] boolForKey:@"kahe_launch_debug_mode"];

    if (debugMode) {
        // ---- 调试模式 ----
        // 预加载引擎（不绑定视图），然后显示调试面板
        self.didStartUniApp = YES;
        dispatch_async(dispatch_get_main_queue(), ^{
            [[PDRCore Instance] start];
            self.isEnginePreloaded = YES;
            NSLog(@"[DebugPanel] UniApp 引擎预加载完成");
        });
        [self showDebugRoot];
    } else {
        // ---- 直接进入 UniApp 模式 ----
        // 走原始流程：网络检测 → UniApp / 离线页
        if ([self isNetworkReachable]) {
            [self showUniAppRoot];
        } else {
            [self showOfflineRoot];
        }
    }

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

#pragma mark -
- (void)startMainApp {
    dispatch_async(dispatch_get_main_queue(), ^(void) {
        [[PDRCore Instance] start];
    });
}

#pragma mark - Network Gate

/// 轻量网络可用性判断（依赖 SystemConfiguration.framework）
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

#pragma mark - Root ViewController 切换

/// 显示 SwiftUI 调试页面（APP 启动时的默认入口）
- (void)showDebugRoot {
    UIViewController *debugVC = [KHDebugViewFactory makeDebugViewController];
    self.window.rootViewController = debugVC;
}

/// 从调试页面切换到 UniApp（供 Swift 调用）
/// 包含网络检测：有网进入 UniApp，无网显示离线页
- (void)switchToUniApp {
    if ([self isNetworkReachable]) {
        [self showUniAppRoot];
    } else {
        [self showOfflineRoot];
    }

    // 页面切换过渡动画
    CATransition *transition = [CATransition animation];
    transition.type = kCATransitionFade;
    transition.duration = 0.3;
    [self.window.layer addAnimation:transition forKey:kCATransition];
}

- (void)showOfflineRoot {
    __weak typeof(self) weakSelf = self;

    OfflineViewController *vc = [[OfflineViewController alloc] init];
    vc.onRetry = ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) { return; }

        // 重新检测网络
        if ([strongSelf isNetworkReachable]) {
            [strongSelf showUniAppRoot];
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
        // 已启动过（比如从无网页切过来），仅切换 root
        // 这里仍然重新创建 ViewController，避免状态不一致
    }

    ViewController *viewController = [[ViewController alloc] init];
    self.h5ViewContoller = viewController;

    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:viewController];
    navigationController.navigationBarHidden = YES;
    self.rootViewController = navigationController;
    self.window.rootViewController = navigationController;

    // 启动 UniApp 引擎（只启动一次）
    if (!self.didStartUniApp) {
        self.didStartUniApp = YES;
        [self startMainApp];
    }

    // 引擎已预加载时跳过 splash screen：
    // Why: 预加载阶段 start 后，JS autoclose 的触发时机已过，
    //       再 showLoadingPage 会导致 splash 永远无法自动关闭
    self.h5ViewContoller.showLoadingView = !self.isEnginePreloaded;
}

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

    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventResignActive withObject:nil];
    }

    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventEnterBackground withObject:nil];
    }
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    if (self.didStartUniApp) {
        [PDRCore handleSysEvent:PDRCoreSysEventEnterForeGround withObject:nil];
    }
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}


- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    [PDRCore destoryEngine];
}

#pragma mark -
#pragma mark URL

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    [self application:application handleOpenURL:url];
    return YES;
}

/*
 * @Summary:程序被第三方调用，传入参数启动
 *
 */
- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
{
    [PDRCore handleSysEvent:PDRCoreSysEventOpenURL withObject:url];
    return YES;
}
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [PDRCore handleSysEvent:PDRCoreSysEventOpenURLWithOptions withObject:@[url,options]];
    return YES;
}

/*
 * @Summary:通用链接
 */
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
