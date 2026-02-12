//
//  KHDeviceHelper.m
//  卡核潮玩 - 设备信息辅助类
//

#import "KHDeviceHelper.h"
#import <sys/utsname.h>
#import <sys/sysctl.h>
#import <mach/mach.h>
#import <ifaddrs.h>
#import <arpa/inet.h>
#import <net/if.h>
#import <SystemConfiguration/SystemConfiguration.h>

@implementation KHDeviceHelper

+ (instancetype)sharedHelper {
    static KHDeviceHelper *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (NSDictionary *)detailedDeviceInfo {
    NSMutableDictionary *info = [NSMutableDictionary dictionary];
    
    // 基础信息
    UIDevice *device = [UIDevice currentDevice];
    info[@"systemName"] = device.systemName;
    info[@"systemVersion"] = device.systemVersion;
    info[@"model"] = device.model;
    info[@"localizedModel"] = device.localizedModel;
    info[@"name"] = device.name;
    
    // 设备型号
    info[@"machineModel"] = [self machineModel];
    
    // 屏幕信息
    UIScreen *screen = [UIScreen mainScreen];
    info[@"screenBounds"] = NSStringFromCGRect(screen.bounds);
    info[@"screenScale"] = @(screen.scale);
    info[@"screenBrightness"] = @(screen.brightness);
    
    // 应用信息
    NSDictionary *bundleInfo = [[NSBundle mainBundle] infoDictionary];
    info[@"appVersion"] = bundleInfo[@"CFBundleShortVersionString"];
    info[@"appBuild"] = bundleInfo[@"CFBundleVersion"];
    info[@"bundleIdentifier"] = [[NSBundle mainBundle] bundleIdentifier];
    
    return [info copy];
}

- (NSString *)machineModel {
    struct utsname systemInfo;
    uname(&systemInfo);
    return [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
}

- (NSDictionary *)batteryStatus {
    NSMutableDictionary *status = [NSMutableDictionary dictionary];
    
    UIDevice *device = [UIDevice currentDevice];
    device.batteryMonitoringEnabled = YES;
    
    status[@"level"] = @(device.batteryLevel);
    status[@"state"] = @(device.batteryState);
    
    NSString *stateString = @"未知";
    switch (device.batteryState) {
        case UIDeviceBatteryStateUnplugged:
            stateString = @"未充电";
            break;
        case UIDeviceBatteryStateCharging:
            stateString = @"充电中";
            break;
        case UIDeviceBatteryStateFull:
            stateString = @"已充满";
            break;
        default:
            break;
    }
    status[@"stateDescription"] = stateString;
    
    return [status copy];
}

- (NSDictionary *)diskSpaceInfo {
    NSMutableDictionary *info = [NSMutableDictionary dictionary];
    
    NSError *error = nil;
    NSDictionary *attrs = [[NSFileManager defaultManager] attributesOfFileSystemForPath:NSHomeDirectory() error:&error];
    
    if (!error) {
        int64_t totalSpace = [attrs[NSFileSystemSize] longLongValue];
        int64_t freeSpace = [attrs[NSFileSystemFreeSize] longLongValue];
        int64_t usedSpace = totalSpace - freeSpace;
        
        info[@"totalSpace"] = @(totalSpace);
        info[@"freeSpace"] = @(freeSpace);
        info[@"usedSpace"] = @(usedSpace);
        info[@"totalSpaceString"] = [self formatBytes:totalSpace];
        info[@"freeSpaceString"] = [self formatBytes:freeSpace];
        info[@"usedSpaceString"] = [self formatBytes:usedSpace];
    }
    
    return [info copy];
}

- (NSString *)formatBytes:(int64_t)bytes {
    NSArray *units = @[@"B", @"KB", @"MB", @"GB", @"TB"];
    NSInteger index = 0;
    double size = bytes;
    
    while (size > 1024 && index < units.count - 1) {
        size /= 1024;
        index++;
    }
    
    return [NSString stringWithFormat:@"%.2f %@", size, units[index]];
}

- (NSDictionary *)memoryUsage {
    NSMutableDictionary *info = [NSMutableDictionary dictionary];
    
    int64_t physicalMemory = [NSProcessInfo processInfo].physicalMemory;
    info[@"physicalMemory"] = @(physicalMemory);
    info[@"physicalMemoryString"] = [self formatBytes:physicalMemory];
    
    struct mach_task_basic_info taskInfo;
    mach_msg_type_number_t count = MACH_TASK_BASIC_INFO_COUNT;
    
    if (task_info(mach_task_self(), MACH_TASK_BASIC_INFO, (task_info_t)&taskInfo, &count) == KERN_SUCCESS) {
        info[@"residentSize"] = @(taskInfo.resident_size);
        info[@"virtualSize"] = @(taskInfo.virtual_size);
        info[@"residentSizeString"] = [self formatBytes:taskInfo.resident_size];
    }
    
    return [info copy];
}

- (NSArray *)networkInterfaces {
    NSMutableArray *interfaces = [NSMutableArray array];
    
    struct ifaddrs *addrs;
    if (getifaddrs(&addrs) == 0) {
        struct ifaddrs *addr = addrs;
        while (addr) {
            if (addr->ifa_addr->sa_family == AF_INET) {
                char host[INET_ADDRSTRLEN];
                inet_ntop(AF_INET, &((struct sockaddr_in *)addr->ifa_addr)->sin_addr, host, INET_ADDRSTRLEN);
                
                NSMutableDictionary *interface = [NSMutableDictionary dictionary];
                interface[@"name"] = [NSString stringWithUTF8String:addr->ifa_name];
                interface[@"address"] = [NSString stringWithUTF8String:host];
                
                [interfaces addObject:interface];
            }
            addr = addr->ifa_next;
        }
        freeifaddrs(addrs);
    }
    
    return [interfaces copy];
}

- (NSString *)generateUniqueIdentifier {
    NSString *vendorId = [[UIDevice currentDevice].identifierForVendor UUIDString];
    NSString *timestamp = [NSString stringWithFormat:@"%.0f", [[NSDate date] timeIntervalSince1970]];
    NSString *combined = [NSString stringWithFormat:@"%@|%@|%@", vendorId, timestamp, [[NSUUID UUID] UUIDString]];
    
    // 简单的哈希
    NSUInteger hash = 0;
    for (NSInteger i = 0; i < combined.length; i++) {
        hash = hash * 31 + [combined characterAtIndex:i];
    }
    
    return [NSString stringWithFormat:@"%@_%lx", [[NSUUID UUID] UUIDString], hash];
}

- (BOOL)isJailbroken {
    // 检查常见的越狱文件
    NSArray *jailbreakPaths = @[
        @"/Applications/Cydia.app",
        @"/Library/MobileSubstrate",
        @"/bin/bash",
        @"/usr/sbin/sshd",
        @"/etc/apt"
    ];
    
    for (NSString *path in jailbreakPaths) {
        if ([[NSFileManager defaultManager] fileExistsAtPath:path]) {
            return YES;
        }
    }
    
    // 尝试写入系统目录
    NSString *testPath = @"/private/jailbreak_test.txt";
    BOOL canWrite = [@"test" writeToFile:testPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
    if (canWrite) {
        [[NSFileManager defaultManager] removeItemAtPath:testPath error:nil];
        return YES;
    }
    
    return NO;
}

- (BOOL)isUsingProxy {
    CFDictionaryRef proxySettings = CFNetworkCopySystemProxySettings();
    if (!proxySettings) return NO;
    
    NSDictionary *settings = (__bridge_transfer NSDictionary *)proxySettings;
    BOOL usingProxy = [settings[@"HTTPProxy"] length] > 0 || [settings[@"HTTPSProxy"] length] > 0;
    
    return usingProxy;
}

@end
