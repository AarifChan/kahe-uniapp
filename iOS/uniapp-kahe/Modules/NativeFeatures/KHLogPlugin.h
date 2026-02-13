//
//  KHLogPlugin.h
//  卡核潮玩 - UniApp 日志插件
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface KHLogPlugin : NSObject

+ (instancetype)sharedPlugin;

- (void)writeLog:(NSString *)message level:(NSString *)level tag:(NSString *)tag;
- (void)writeLogs:(NSArray<NSDictionary *> *)logs;
- (NSArray<NSString *> *)getLogFiles;
- (NSString *)getTodayLogContent;
- (NSString *)getLogContentForDate:(NSString *)dateString;
- (NSString *)exportLogs;
- (void)clearAllLogs;
- (void)clearLogsBeforeDays:(NSInteger)days;
- (NSDictionary *)getLogStats;

@end

@interface KHLogEntry : NSObject
@property (nonatomic, strong) NSDate *timestamp;
@property (nonatomic, copy) NSString *level;
@property (nonatomic, copy) NSString *tag;
@property (nonatomic, copy) NSString *message;
- (instancetype)initWithMessage:(NSString *)message level:(NSString *)level tag:(NSString *)tag;
- (NSString *)toString;
@end

@interface KHLogFileManager : NSObject
+ (instancetype)sharedManager;
- (NSString *)logDirectory;
- (NSString *)todayLogFilePath;
- (NSString *)logFilePathForDate:(NSString *)dateString;
- (NSArray<NSString *> *)allLogFiles;
- (void)deleteLogFileForDate:(NSString *)dateString;
- (void)cleanupLogsBeforeDays:(NSInteger)days;
- (NSString *)compressAllLogs;
@end

NS_ASSUME_NONNULL_END
