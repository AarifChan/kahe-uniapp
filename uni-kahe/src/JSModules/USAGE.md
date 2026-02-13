# JSModules 使用说明

## 已集成的模块

### 1. kh-log-plugin - 原生日志插件

用于将 uniapp 日志保存到本地文件，支持 APP 端。

## 快速开始

### 方式一：使用 Composable（推荐）

```vue
<script setup lang="ts">
import { useLog, usePerformanceLog, useApiLog } from '@/composables/useLog';

// 基础日志
const { logger } = useLog({ tag: 'MyPage' });

// 性能监控
const perf = usePerformanceLog();

// API 日志
const apiLog = useApiLog();

// 写入日志
logger.info('页面加载完成');
logger.error('请求失败', error);

// 性能监控
perf.start('request');
await fetchData();
perf.end('request');

// API 日志
apiLog.request('/api/user', { id: 1 });
apiLog.response('/api/user', { name: '张三' });
</script>
```

### 方式二：直接使用

```ts
import { $log, LogLevel } from '@/main';

// 写入日志
$log.info('信息日志');
$log.error('错误日志');
$log.debug('调试日志', 'CustomTag');

// 配置
$log.applyConfig({
  tag: 'MyApp',
  enabled: true,
  minLevel: LogLevel.INFO
});

// 获取日志
const todayLog = await $log.getTodayLog();
const stats = await $log.getStats();
```

### 方式三：模板中使用

```vue
<template>
  <button @click="handleClick">点击</button>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const handleClick = () => {
  proxy.$log.info('按钮被点击');
};
</script>
```

## 日志级别

```ts
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
```

## API 参考

### 基础方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `debug(msg, tag?)` | DEBUG 日志 | `$log.debug('调试信息')` |
| `info(msg, tag?)` | INFO 日志 | `$log.info('用户信息', 'User')` |
| `warn(msg, tag?)` | WARN 日志 | `$log.warn('警告信息')` |
| `error(msg, tag?)` | ERROR 日志 | `$log.error(error, 'API')` |
| `write(msg, level, tag?)` | 通用写入 | `$log.write('消息', LogLevel.INFO)` |

### 管理方法

| 方法 | 说明 | 示例 |
|------|------|------|
| `getTodayLog()` | 获取今日日志 | `await $log.getTodayLog()` |
| `getLogForDate(date)` | 获取指定日期 | `await $log.getLogForDate('2024-01-15')` |
| `exportLogs()` | 导出日志 | `await $log.exportLogs()` |
| `clearLogs()` | 清空日志 | `await $log.clearLogs()` |
| `clearOldLogs(days)` | 清理旧日志 | `await $log.clearOldLogs(7)` |
| `getStats()` | 获取统计 | `await $log.getStats()` |

### 配置方法

```ts
$log.applyConfig({
  tag: 'App',           // 默认标签
  enabled: true,        // 是否启用
  minLevel: LogLevel.DEBUG,  // 最低级别
  maxCacheSize: 100,    // 最大缓存
  flushInterval: 5000   // 刷新间隔(ms)
});
```

## 测试页面

已创建测试页面：`pages/test-log/index`

导航到该页面可以测试所有日志功能。

## 注意事项

1. 日志插件仅在 APP 端（iOS/Android）有效
2. 小程序端会降级为普通 console 输出
3. 建议在生产环境设置 `minLevel: LogLevel.INFO` 减少日志量
