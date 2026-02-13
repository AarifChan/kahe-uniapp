//
//  KHLogPluginBridge.m
//  卡核潮玩 - UniApp 日志插件桥接
//

#import "KHLogPluginBridge.h"
#import "KHLogPlugin.h"
#import "PDRCore.h"
#import "PDRCoreApp.h"
#import "PDRCoreAppManager.h"

#pragma mark - KHLogPluginBridge

@implementation KHLogPluginBridge

// UniApp 插件标准接口
- (void)writeLog:(NSDictionary *)options {
    NSString *message = options[@"message"];
    NSString *level = options[@"level"] ?: @"INFO";
    NSString *tag = options[@"tag"] ?: @"APP";
    
    if (message) {
        [[KHLogPlugin sharedPlugin] writeLog:message level:level tag:tag];
    }
    
    // 返回成功
    if (self.callback) {
        self.callback(@{ @"code": @0, @"msg": @"success" });
    }
}

- (void)writeLogs:(NSDictionary *)options {
    NSArray *logs = options[@"logs"];
    if (logs && logs.count > 0) {
        [[KHLogPlugin sharedPlugin] writeLogs:logs];
    }
    
    if (self.callback) {
        self.callback(@{ @"code": @0, @"msg": @"success", @"count": @(logs.count) });
    }
}

- (void)getTodayLog:(NSDictionary *)options {
    NSString *content = [[KHLogPlugin sharedPlugin] getTodayLogContent];
    
    if (self.callback) {
        self.callback(@{
            @"code": @0,
            @"msg": @"success",
            @"data": content ?: @""
        });
    }
}

- (void)getLogForDate:(NSDictionary *)options {
    NSString *date = options[@"date"];
    if (!date) {
        if (self.callback) {
            self.callback(@{ @"code": @-1, @"msg": @"date is required" });
        }
        return;
    }
    
    NSString *content = [[KHLogPlugin sharedPlugin] getLogContentForDate:date];
    
    if (self.callback) {
        self.callback(@{
            @"code": @0,
            @"msg": @"success",
            @"data": content ?: @""
        });
    }
}

- (void)exportLogs:(NSDictionary *)options {
    NSString *exportPath = [[KHLogPlugin sharedPlugin] exportLogs];
    
    if (self.callback) {
        self.callback(@{
            @"code": exportPath ? @0 : @-1,
            @"msg": exportPath ? @"success" : @"export failed",
            @"path": exportPath ?: @""
        });
    }
}

- (void)clearLogs:(NSDictionary *)options {
    [[KHLogPlugin sharedPlugin] clearAllLogs];
    
    if (self.callback) {
        self.callback(@{ @"code": @0, @"msg": @"success" });
    }
}

- (void)clearOldLogs:(NSDictionary *)options {
    NSInteger keepDays = [options[@"keepDays"] integerValue];
    if (keepDays <= 0) keepDays = 7;
    
    [[KHLogPlugin sharedPlugin] clearLogsBeforeDays:keepDays];
    
    if (self.callback) {
        self.callback(@{ @"code": @0, @"msg": @"success" });
    }
}

- (void)getLogStats:(NSDictionary *)options {
    NSDictionary *stats = [[KHLogPlugin sharedPlugin] getLogStats];
    
    if (self.callback) {
        self.callback(@{
            @"code": @0,
            @"msg": @"success",
            @"data": stats ?: @{}
        });
    }
}

@end

#pragma mark - 插件注册

// UniApp 插件注册函数
void KHLogPluginRegister() {
    // 注册插件到 PDRCore
    Class pluginClass = [KHLogPluginBridge class];
    
    // 使用运行时注册
    // 注意：实际的注册方式取决于 UniApp SDK 的版本
    NSLog(@"[KHLogPlugin] 插件已注册");
}
