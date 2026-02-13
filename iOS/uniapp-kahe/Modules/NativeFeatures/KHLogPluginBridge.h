//
//  KHLogPluginBridge.h
//  卡核潮玩 - UniApp 日志插件桥接
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/// UniApp 日志插件桥接类
/// 提供 JS 调用原生日志功能的接口
@interface KHLogPluginBridge : NSObject

/// JS 回调 Block
@property (nonatomic, copy) void (^callback)(NSDictionary *result);

#pragma mark - JS 可调用的方法

/// 写入单条日志
/// JS: uni.requireNativePlugin('KHLogPlugin').writeLog({message: 'xxx', level: 'INFO', tag: 'APP'})
- (void)writeLog:(NSDictionary *)options;

/// 批量写入日志
/// JS: uni.requireNativePlugin('KHLogPlugin').writeLogs({logs: [{message: 'xxx', level: 'INFO'}]})
- (void)writeLogs:(NSDictionary *)options;

/// 获取今日日志
/// JS: uni.requireNativePlugin('KHLogPlugin').getTodayLog({}, (res) => {})
- (void)getTodayLog:(NSDictionary *)options;

/// 获取指定日期的日志
/// JS: uni.requireNativePlugin('KHLogPlugin').getLogForDate({date: '2024-01-01'})
- (void)getLogForDate:(NSDictionary *)options;

/// 导出所有日志
/// JS: uni.requireNativePlugin('KHLogPlugin').exportLogs({}, (res) => {})
- (void)exportLogs:(NSDictionary *)options;

/// 清空所有日志
/// JS: uni.requireNativePlugin('KHLogPlugin').clearLogs({})
- (void)clearLogs:(NSDictionary *)options;

/// 清空旧日志
/// JS: uni.requireNativePlugin('KHLogPlugin').clearOldLogs({keepDays: 7})
- (void)clearOldLogs:(NSDictionary *)options;

/// 获取日志统计
/// JS: uni.requireNativePlugin('KHLogPlugin').getLogStats({}, (res) => {})
- (void)getLogStats:(NSDictionary *)options;

@end

/// 插件注册函数
void KHLogPluginRegister(void);

NS_ASSUME_NONNULL_END
