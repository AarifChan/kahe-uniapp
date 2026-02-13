//
//  KHTransitionViewController.m
//  uniapp-kahe
//
//  原生过渡页面 - 预加载 UniApp 并丝滑过渡
//

#import "KHTransitionViewController.h"

@interface KHTransitionViewController ()

@property (nonatomic, strong) UIImageView *logoImageView;
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UILabel *subtitleLabel;
@property (nonatomic, strong) UILabel *statusLabel;
@property (nonatomic, strong) UIProgressView *progressView;
@property (nonatomic, strong) UIView *progressContainer;
@property (nonatomic, strong) CAGradientLayer *gradientLayer;
@property (nonatomic, strong) UIView *shimmerView;

@end

@implementation KHTransitionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupGradientBackground];
    [self setupUI];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self startLoadingAnimation];
}

#pragma mark - UI Setup

- (void)setupGradientBackground {
    // 创建渐变背景
    self.gradientLayer = [CAGradientLayer layer];
    self.gradientLayer.frame = self.view.bounds;
    
    // 温馨的渐变色彩（从浅黄到浅橙）
    self.gradientLayer.colors = @[
        (__bridge id)[UIColor colorWithRed:1.0 green:0.97 blue:0.9 alpha:1.0].CGColor,
        (__bridge id)[UIColor colorWithRed:1.0 green:0.94 blue:0.88 alpha:1.0].CGColor,
        (__bridge id)[UIColor colorWithRed:1.0 green:0.92 blue:0.85 alpha:1.0].CGColor
    ];
    
    self.gradientLayer.locations = @[@0.0, @0.5, @1.0];
    self.gradientLayer.startPoint = CGPointMake(0, 0);
    self.gradientLayer.endPoint = CGPointMake(1, 1);
    
    [self.view.layer insertSublayer:self.gradientLayer atIndex:0];
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    self.gradientLayer.frame = self.view.bounds;
}

- (void)setupUI {
    // Logo 图片
    self.logoImageView = [[UIImageView alloc] init];
    self.logoImageView.contentMode = UIViewContentModeScaleAspectFit;
    self.logoImageView.image = [UIImage imageNamed:@"app-logo"];
    self.logoImageView.translatesAutoresizingMaskIntoConstraints = NO;
    self.logoImageView.layer.cornerRadius = 24;
    self.logoImageView.layer.masksToBounds = YES;
    // 添加阴影
    self.logoImageView.layer.shadowColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.15].CGColor;
    self.logoImageView.layer.shadowOffset = CGSizeMake(0, 8);
    self.logoImageView.layer.shadowRadius = 20;
    self.logoImageView.layer.shadowOpacity = 1;
    [self.view addSubview:self.logoImageView];
    
    // 标题
    self.titleLabel = [[UILabel alloc] init];
    self.titleLabel.text = @"卡核潮玩";
    self.titleLabel.font = [UIFont systemFontOfSize:32 weight:UIFontWeightSemibold];
    self.titleLabel.textColor = [UIColor colorWithRed:0.25 green:0.2 blue:0.15 alpha:1.0];
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    self.titleLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:self.titleLabel];
    
    // 副标题
    UILabel *subtitleLabel = [[UILabel alloc] init];
    subtitleLabel.text = @"发现潮玩乐趣";
    subtitleLabel.font = [UIFont systemFontOfSize:14 weight:UIFontWeightRegular];
    subtitleLabel.textColor = [UIColor colorWithRed:0.5 green:0.45 blue:0.4 alpha:1.0];
    subtitleLabel.textAlignment = NSTextAlignmentCenter;
    subtitleLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:subtitleLabel];
    self.subtitleLabel = subtitleLabel;
    
    // 状态文字
    self.statusLabel = [[UILabel alloc] init];
    self.statusLabel.text = @"正在初始化...";
    self.statusLabel.font = [UIFont systemFontOfSize:13 weight:UIFontWeightMedium];
    self.statusLabel.textColor = [UIColor colorWithRed:0.55 green:0.5 blue:0.45 alpha:1.0];
    self.statusLabel.textAlignment = NSTextAlignmentCenter;
    self.statusLabel.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:self.statusLabel];
    
    // 进度条容器
    self.progressContainer = [[UIView alloc] init];
    self.progressContainer.backgroundColor = [UIColor colorWithRed:0.9 green:0.87 blue:0.82 alpha:0.5];
    self.progressContainer.layer.cornerRadius = 3;
    self.progressContainer.translatesAutoresizingMaskIntoConstraints = NO;
    [self.view addSubview:self.progressContainer];
    
    // 进度条
    self.progressView = [[UIProgressView alloc] initWithProgressViewStyle:UIProgressViewStyleDefault];
    self.progressView.progressTintColor = [UIColor colorWithRed:1.0 green:0.72 blue:0.35 alpha:1.0];
    self.progressView.trackTintColor = [UIColor clearColor];
    self.progressView.progress = 0;
    self.progressView.layer.cornerRadius = 3;
    self.progressView.clipsToBounds = YES;
    self.progressView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.progressContainer addSubview:self.progressView];
    
    // shimmer 效果层
    self.shimmerView = [[UIView alloc] init];
    self.shimmerView.backgroundColor = [UIColor colorWithWhite:1 alpha:0.4];
    self.shimmerView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.progressContainer addSubview:self.shimmerView];
    
    // 设置约束
    [NSLayoutConstraint activateConstraints:@[
        // Logo
        [self.logoImageView.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.logoImageView.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor constant:-100],
        [self.logoImageView.widthAnchor constraintEqualToConstant:110],
        [self.logoImageView.heightAnchor constraintEqualToConstant:110],
        
        // 标题
        [self.titleLabel.topAnchor constraintEqualToAnchor:self.logoImageView.bottomAnchor constant:24],
        [self.titleLabel.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.titleLabel.widthAnchor constraintEqualToAnchor:self.view.widthAnchor],
        
        // 副标题
        [subtitleLabel.topAnchor constraintEqualToAnchor:self.titleLabel.bottomAnchor constant:8],
        [subtitleLabel.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [subtitleLabel.widthAnchor constraintEqualToAnchor:self.view.widthAnchor],
        
        // 进度条容器
        [self.progressContainer.bottomAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.bottomAnchor constant:-120],
        [self.progressContainer.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.progressContainer.widthAnchor constraintEqualToConstant:220],
        [self.progressContainer.heightAnchor constraintEqualToConstant:6],
        
        // 进度条
        [self.progressView.leadingAnchor constraintEqualToAnchor:self.progressContainer.leadingAnchor],
        [self.progressView.trailingAnchor constraintEqualToAnchor:self.progressContainer.trailingAnchor],
        [self.progressView.centerYAnchor constraintEqualToAnchor:self.progressContainer.centerYAnchor],
        [self.progressView.heightAnchor constraintEqualToConstant:6],
        
        // shimmer
        [self.shimmerView.leadingAnchor constraintEqualToAnchor:self.progressContainer.leadingAnchor],
        [self.shimmerView.topAnchor constraintEqualToAnchor:self.progressContainer.topAnchor],
        [self.shimmerView.bottomAnchor constraintEqualToAnchor:self.progressContainer.bottomAnchor],
        [self.shimmerView.widthAnchor constraintEqualToConstant:40],
        
        // 状态文字
        [self.statusLabel.bottomAnchor constraintEqualToAnchor:self.progressContainer.topAnchor constant:-16],
        [self.statusLabel.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [self.statusLabel.widthAnchor constraintEqualToAnchor:self.view.widthAnchor]
    ]];
    
    // 初始状态
    self.logoImageView.alpha = 0;
    self.logoImageView.transform = CGAffineTransformMakeScale(0.6, 0.6);
    self.titleLabel.alpha = 0;
    self.titleLabel.transform = CGAffineTransformMakeTranslation(0, 20);
    subtitleLabel.alpha = 0;
    self.statusLabel.alpha = 0;
    self.progressContainer.alpha = 0;
    self.progressContainer.transform = CGAffineTransformMakeTranslation(0, 10);
}

#pragma mark - Animation

- (void)startLoadingAnimation {
    // Logo 弹性缩放进入
    [UIView animateWithDuration:0.7
                          delay:0.1
         usingSpringWithDamping:0.65
          initialSpringVelocity:0.4
                        options:UIViewAnimationOptionCurveEaseOut
                     animations:^{
        self.logoImageView.alpha = 1;
        self.logoImageView.transform = CGAffineTransformIdentity;
    } completion:nil];
    
    // 标题滑入
    [UIView animateWithDuration:0.6
                          delay:0.3
         usingSpringWithDamping:0.8
          initialSpringVelocity:0.3
                        options:UIViewAnimationOptionCurveEaseOut
                     animations:^{
        self.titleLabel.alpha = 1;
        self.titleLabel.transform = CGAffineTransformIdentity;
    } completion:nil];
    
    // 副标题淡入
    [UIView animateWithDuration:0.5
                          delay:0.45
                        options:UIViewAnimationOptionCurveEaseOut
                     animations:^{
        self.subtitleLabel.alpha = 1;
    } completion:nil];
    
    // 进度条和状态文字淡入
    [UIView animateWithDuration:0.5
                          delay:0.55
                        options:UIViewAnimationOptionCurveEaseOut
                     animations:^{
        self.statusLabel.alpha = 1;
        self.progressContainer.alpha = 1;
        self.progressContainer.transform = CGAffineTransformIdentity;
    } completion:^(BOOL finished) {
        [self startShimmerAnimation];
    }];
}

- (void)startShimmerAnimation {
    // 创建 shimmer 滑动效果
    CABasicAnimation *shimmer = [CABasicAnimation animationWithKeyPath:@"position.x"];
    shimmer.fromValue = @(-40);
    shimmer.toValue = @(260);
    shimmer.duration = 1.5;
    shimmer.repeatCount = HUGE_VALF;
    shimmer.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    [self.shimmerView.layer addAnimation:shimmer forKey:@"shimmer"];
}

#pragma mark - Public Methods

- (void)updateProgress:(CGFloat)progress {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.progressView setProgress:progress animated:YES];
    });
}

- (void)updateStatusText:(NSString *)text {
    dispatch_async(dispatch_get_main_queue(), ^{
        // 淡出旧文字
        [UIView animateWithDuration:0.15 animations:^{
            self.statusLabel.alpha = 0.5;
        } completion:^(BOOL finished) {
            self.statusLabel.text = text;
            // 淡入新文字
            [UIView animateWithDuration:0.15 animations:^{
                self.statusLabel.alpha = 1;
            }];
        }];
    });
}

- (void)transitionToUniAppWithCompletion:(void (^)(void))completion {
    dispatch_async(dispatch_get_main_queue(), ^{
        // 完成进度
        [self.progressView setProgress:1.0 animated:YES];
        self.statusLabel.text = @"准备就绪";
        
        // 停止 shimmer
        [self.shimmerView.layer removeAnimationForKey:@"shimmer"];
        
        // 创建过渡效果
        [UIView animateWithDuration:0.4
                              delay:0.2
                            options:UIViewAnimationOptionCurveEaseInOut
                         animations:^{
            // 所有元素同步淡出并上移
            self.logoImageView.alpha = 0;
            self.logoImageView.transform = CGAffineTransformMakeScale(1.1, 1.1);
            
            self.titleLabel.alpha = 0;
            self.titleLabel.transform = CGAffineTransformMakeTranslation(0, -20);
            
            self.subtitleLabel.alpha = 0;
            self.statusLabel.alpha = 0;
            self.progressContainer.alpha = 0;
            self.progressContainer.transform = CGAffineTransformMakeTranslation(0, 20);
            
            // 背景变白
            self.gradientLayer.opacity = 0;
        } completion:^(BOOL finished) {
            if (completion) {
                completion();
            }
        }];
    });
}

@end
