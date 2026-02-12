//
//  KHDeviceHelper.h
//  卡核潮玩 - 设备信息辅助类
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/// 设备信息辅助类
@interface KHDeviceHelper : NSObject

/// 单例
+ (instancetype)sharedHelper;

/// 获取详细设备信息
- (NSDictionary *)detailedDeviceInfo;

/// 获取电池状态
- (NSDictionary *)batteryStatus;

/// 获取磁盘空间信息
- (NSDictionary *)diskSpaceInfo;

/// 获取内存使用情况
- (NSDictionary *)memoryUsage;

/// 获取网络接口信息
- (NSArray *)networkInterfaces;

/// 生成唯一设备标识
- (NSString *)generateUniqueIdentifier;

/// 检查是否越狱
- (BOOL)isJailbroken;

/// 检查是否使用代理
- (BOOL)isUsingProxy;

@end

NS_ASSUME_NONNULL_END
