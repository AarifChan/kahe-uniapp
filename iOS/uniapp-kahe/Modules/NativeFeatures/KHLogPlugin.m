//
//  KHLogPlugin.m
//  卡核潮玩 - UniApp 日志插件
//

#import "KHLogPlugin.h"
#import <zlib.h>

#pragma mark - KHLogEntry

@implementation KHLogEntry

- (instancetype)initWithMessage:(NSString *)message level:(NSString *)level tag:(NSString *)tag {
    self = [super init];
    if (self) {
        _timestamp = [NSDate date];
        _message = message ?: @"";
        _level = level ?: @"INFO";
        _tag = tag ?: @"APP";
    }
    return self;
}

- (NSString *)toString {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    formatter.dateFormat = @"yyyy-MM-dd HH:mm:ss.SSS";
    NSString *timeStr = [formatter stringFromDate:self.timestamp];
    return [NSString stringWithFormat:@"[%@] [%@] [%@] %@", timeStr, self.level, self.tag, self.message];
}

@end

#pragma mark - KHLogFileManager

@implementation KHLogFileManager

+ (instancetype)sharedManager {
    static KHLogFileManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
        [instance createLogDirectory];
    });
    return instance;
}

- (NSString *)logDirectory {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = paths[0];
    return [documentsDirectory stringByAppendingPathComponent:@"KHLogs"];
}

- (void)createLogDirectory {
    NSString *logDir = [self logDirectory];
    NSFileManager *fm = [NSFileManager defaultManager];
    if (![fm fileExistsAtPath:logDir]) {
        [fm createDirectoryAtPath:logDir withIntermediateDirectories:YES attributes:nil error:nil];
    }
}

- (NSString *)todayLogFilePath {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    formatter.dateFormat = @"yyyy-MM-dd";
    NSString *dateStr = [formatter stringFromDate:[NSDate date]];
    return [self logFilePathForDate:dateStr];
}

- (NSString *)logFilePathForDate:(NSString *)dateString {
    return [[self logDirectory] stringByAppendingPathComponent:[NSString stringWithFormat:@"app_%@.log", dateString]];
}

- (NSArray<NSString *> *)allLogFiles {
    NSFileManager *fm = [NSFileManager defaultManager];
    NSArray *files = [fm contentsOfDirectoryAtPath:[self logDirectory] error:nil];
    NSMutableArray *logFiles = [NSMutableArray array];
    for (NSString *file in files) {
        if ([file hasSuffix:@".log"]) {
            [logFiles addObject:[[self logDirectory] stringByAppendingPathComponent:file]];
        }
    }
    return [logFiles sortedArrayUsingSelector:@selector(compare:)];
}

- (void)deleteLogFileForDate:(NSString *)dateString {
    NSString *path = [self logFilePathForDate:dateString];
    [[NSFileManager defaultManager] removeItemAtPath:path error:nil];
}

- (void)cleanupLogsBeforeDays:(NSInteger)days {
    if (days <= 0) return;
    
    NSDate *cutoffDate = [[NSDate date] dateByAddingTimeInterval:-days * 24 * 60 * 60];
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    formatter.dateFormat = @"yyyy-MM-dd";
    
    NSArray *allFiles = [self allLogFiles];
    NSFileManager *fm = [NSFileManager defaultManager];
    
    for (NSString *filePath in allFiles) {
        NSDictionary *attrs = [fm attributesOfItemAtPath:filePath error:nil];
        NSDate *modDate = attrs[NSFileModificationDate];
        if ([modDate compare:cutoffDate] == NSOrderedAscending) {
            [fm removeItemAtPath:filePath error:nil];
        }
    }
}

- (NSString *)compressAllLogs {
    NSArray *logFiles = [self allLogFiles];
    if (logFiles.count == 0) return nil;
    
    NSString *zipPath = [[self logDirectory] stringByAppendingPathComponent:@"logs_export.zip"];
    
    // 使用 zipArchive 或创建简单的 tar
    NSFileManager *fm = [NSFileManager defaultManager];
    [fm removeItemAtPath:zipPath error:nil];
    
    // 简单实现：将所有日志合并到一个文件
    NSString *combinedPath = [[self logDirectory] stringByAppendingPathComponent:@"all_logs.txt"];
    NSMutableString *combined = [NSMutableString string];
    
    for (NSString *logFile in logFiles) {
        NSString *content = [NSString stringWithContentsOfFile:logFile encoding:NSUTF8StringEncoding error:nil];
        if (content) {
            [combined appendFormat:@"\n========== %@ ==========\n", [logFile lastPathComponent]];
            [combined appendString:content];
            [combined appendString:@"\n"];
        }
    }
    
    [combined writeToFile:combinedPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
    return combinedPath;
}

@end

#pragma mark - KHLogPlugin

@interface KHLogPlugin ()
@property (nonatomic, strong) NSOperationQueue *logQueue;
@property (nonatomic, strong) NSMutableDictionary *fileHandles;
@end

@implementation KHLogPlugin

+ (instancetype)sharedPlugin {
    static KHLogPlugin *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _logQueue = [[NSOperationQueue alloc] init];
        _logQueue.maxConcurrentOperationCount = 1;
        _logQueue.name = @"com.kahe.logQueue";
        _fileHandles = [NSMutableDictionary dictionary];
        
        // 注册通知
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(applicationWillTerminate)
                                                     name:UIApplicationWillTerminateNotification
                                                   object:nil];
    }
    return self;
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [self closeAllFileHandles];
}

- (void)applicationWillTerminate {
    [self closeAllFileHandles];
}

- (void)closeAllFileHandles {
    for (NSFileHandle *handle in self.fileHandles.allValues) {
        [handle closeFile];
    }
    [self.fileHandles removeAllObjects];
}

- (NSFileHandle *)getFileHandleForPath:(NSString *)path {
    NSFileHandle *handle = self.fileHandles[path];
    if (!handle) {
        NSFileManager *fm = [NSFileManager defaultManager];
        if (![fm fileExistsAtPath:path]) {
            [fm createFileAtPath:path contents:nil attributes:nil];
        }
        handle = [NSFileHandle fileHandleForWritingAtPath:path];
        if (handle) {
            [handle seekToEndOfFile];
            self.fileHandles[path] = handle;
        }
    }
    return handle;
}

- (void)writeLog:(NSString *)message level:(NSString *)level tag:(NSString *)tag {
    if (!message || message.length == 0) return;
    
    KHLogEntry *entry = [[KHLogEntry alloc] initWithMessage:message level:level tag:tag];
    NSString *logString = [entry toString];
    
    [self.logQueue addOperationWithBlock:^{
        // 写入文件
        NSString *filePath = [[KHLogFileManager sharedManager] todayLogFilePath];
        NSFileHandle *handle = [self getFileHandleForPath:filePath];
        
        if (handle) {
            NSString *line = [logString stringByAppendingString:@"\n"];
            NSData *data = [line dataUsingEncoding:NSUTF8StringEncoding];
            [handle writeData:data];
            [handle synchronizeFile];
        }
        
        // 同时输出到控制台
        NSLog(@"[UniAppLog] %@", logString);
    }];
}

- (void)writeLogs:(NSArray<NSDictionary *> *)logs {
    if (!logs || logs.count == 0) return;
    
    [self.logQueue addOperationWithBlock:^{
        NSMutableArray *logStrings = [NSMutableArray array];
        
        for (NSDictionary *logDict in logs) {
            NSString *message = logDict[@"message"];
            NSString *level = logDict[@"level"] ?: @"INFO";
            NSString *tag = logDict[@"tag"] ?: @"APP";
            
            if (message) {
                KHLogEntry *entry = [[KHLogEntry alloc] initWithMessage:message level:level tag:tag];
                [logStrings addObject:[entry toString]];
            }
        }
        
        if (logStrings.count > 0) {
            NSString *filePath = [[KHLogFileManager sharedManager] todayLogFilePath];
            NSFileHandle *handle = [self getFileHandleForPath:filePath];
            
            if (handle) {
                for (NSString *logString in logStrings) {
                    NSString *line = [logString stringByAppendingString:@"\n"];
                    NSData *data = [line dataUsingEncoding:NSUTF8StringEncoding];
                    [handle writeData:data];
                }
                [handle synchronizeFile];
            }
        }
    }];
}

- (NSArray<NSString *> *)getLogFiles {
    return [[KHLogFileManager sharedManager] allLogFiles];
}

- (NSString *)getTodayLogContent {
    NSString *filePath = [[KHLogFileManager sharedManager] todayLogFilePath];
    return [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] ?: @"";
}

- (NSString *)getLogContentForDate:(NSString *)dateString {
    NSString *filePath = [[KHLogFileManager sharedManager] logFilePathForDate:dateString];
    return [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil] ?: @"";
}

- (NSString *)exportLogs {
    return [[KHLogFileManager sharedManager] compressAllLogs];
}

- (void)clearAllLogs {
    NSArray *files = [[KHLogFileManager sharedManager] allLogFiles];
    NSFileManager *fm = [NSFileManager defaultManager];
    for (NSString *file in files) {
        [fm removeItemAtPath:file error:nil];
    }
}

- (void)clearLogsBeforeDays:(NSInteger)days {
    [[KHLogFileManager sharedManager] cleanupLogsBeforeDays:days];
}

- (NSDictionary *)getLogStats {
    NSMutableDictionary *stats = [NSMutableDictionary dictionary];
    
    NSArray *files = [[KHLogFileManager sharedManager] allLogFiles];
    stats[@"totalFiles"] = @(files.count);
    
    unsigned long long totalSize = 0;
    NSFileManager *fm = [NSFileManager defaultManager];
    
    for (NSString *file in files) {
        NSDictionary *attrs = [fm attributesOfItemAtPath:file error:nil];
        totalSize += [attrs fileSize];
    }
    
    stats[@"totalSize"] = @(totalSize);
    stats[@"totalSizeReadable"] = [self formatBytes:totalSize];
    stats[@"logDirectory"] = [[KHLogFileManager sharedManager] logDirectory];
    
    return [stats copy];
}

- (NSString *)formatBytes:(unsigned long long)bytes {
    NSArray *units = @[@"B", @"KB", @"MB", @"GB"];
    NSInteger index = 0;
    double size = bytes;
    
    while (size > 1024 && index < units.count - 1) {
        size /= 1024;
        index++;
    }
    
    return [NSString stringWithFormat:@"%.2f %@", size, units[index]];
}

@end
