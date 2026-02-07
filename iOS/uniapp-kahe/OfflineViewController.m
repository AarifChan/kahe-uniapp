//
//  OfflineViewController.m
//  uniapp-kahe
//
//  Created by Cursor on 2026/01/20.
//

#import "OfflineViewController.h"

@interface OfflineViewController ()
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UILabel *descLabel;
@property (nonatomic, strong) UIButton *retryButton;
@end

@implementation OfflineViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor systemBackgroundColor];

    UILabel *title = [[UILabel alloc] init];
    title.translatesAutoresizingMaskIntoConstraints = NO;
    title.text = @"当前网络不可用";
    title.font = [UIFont boldSystemFontOfSize:20];
    title.textAlignment = NSTextAlignmentCenter;
    title.textColor = [UIColor labelColor];
    [self.view addSubview:title];
    self.titleLabel = title;

    UILabel *desc = [[UILabel alloc] init];
    desc.translatesAutoresizingMaskIntoConstraints = NO;
    desc.text = @"请检查网络连接后重试";
    desc.font = [UIFont systemFontOfSize:14];
    desc.textAlignment = NSTextAlignmentCenter;
    desc.textColor = [UIColor secondaryLabelColor];
    desc.numberOfLines = 0;
    [self.view addSubview:desc];
    self.descLabel = desc;

    UIButton *btn = [UIButton buttonWithType:UIButtonTypeSystem];
    btn.translatesAutoresizingMaskIntoConstraints = NO;
    [btn setTitle:@"重新加载" forState:UIControlStateNormal];
    btn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
    btn.contentEdgeInsets = UIEdgeInsetsMake(12, 24, 12, 24);
    btn.layer.cornerRadius = 10;
    btn.layer.masksToBounds = YES;
    btn.backgroundColor = [UIColor systemBlueColor];
    [btn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [btn addTarget:self action:@selector(onRetryTapped) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btn];
    self.retryButton = btn;

    [NSLayoutConstraint activateConstraints:@[
        [title.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [title.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor constant:-40],
        [title.leadingAnchor constraintGreaterThanOrEqualToAnchor:self.view.leadingAnchor constant:24],
        [title.trailingAnchor constraintLessThanOrEqualToAnchor:self.view.trailingAnchor constant:-24],

        [desc.topAnchor constraintEqualToAnchor:title.bottomAnchor constant:12],
        [desc.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
        [desc.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor constant:24],
        [desc.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor constant:-24],

        [btn.topAnchor constraintEqualToAnchor:desc.bottomAnchor constant:24],
        [btn.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
    ]];
}

- (void)onRetryTapped {
    if (self.onRetry) {
        self.onRetry();
    }
}

- (void)updateStatusText:(NSString *)text {
    self.descLabel.text = text;
}

- (void)setRetryEnabled:(BOOL)enabled {
    self.retryButton.enabled = enabled;
    self.retryButton.alpha = enabled ? 1.0 : 0.6;
}

@end

