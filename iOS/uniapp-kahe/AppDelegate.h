//
//  AppDelegate.h
//  Pandora
//
//  Created by Mac Pro_C on 12-12-26.
//  Copyright (c) 2012年 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
extern int _uniArgc;
extern char** _uniArgv;
@interface AppDelegate : UIResponder <UIApplicationDelegate>
@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) UINavigationController *rootViewController;

/// UniApp 引擎是否已完成预加载（供 Swift 调试页面轮询状态）
@property (assign, nonatomic) BOOL isEnginePreloaded;

/// 从 SwiftUI 调试页面切换到 UniApp 页面（供 Swift 调用）
- (void)switchToUniApp;
@end
