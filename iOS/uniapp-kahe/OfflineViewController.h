//
//  OfflineViewController.h
//  uniapp-kahe
//
//  Created by Cursor on 2026/01/20.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/// 无网络占位页
@interface OfflineViewController : UIViewController

/// 点击“重新加载”回调（由 AppDelegate 注入）
@property (nonatomic, copy, nullable) void (^onRetry)(void);

/// 更新提示文案
- (void)updateStatusText:(NSString *)text;

/// 设置按钮是否可点
- (void)setRetryEnabled:(BOOL)enabled;

@end

NS_ASSUME_NONNULL_END

