//
//  KHTransitionViewController.h
//  uniapp-kahe
//
//  原生过渡页面 - 预加载 UniApp 并丝滑过渡
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface KHTransitionViewController : UIViewController

/// 开始加载动画
- (void)startLoadingAnimation;

/// 更新加载进度 (0.0 - 1.0)
- (void)updateProgress:(CGFloat)progress;

/// 更新加载状态文本
- (void)updateStatusText:(NSString *)text;

/// 执行过渡到 UniApp 的动画
/// @param completion 动画完成回调
- (void)transitionToUniAppWithCompletion:(void (^)(void))completion;

@end

NS_ASSUME_NONNULL_END
