# UniApp 原生日志插件 - TypeScript 版本

## 文件说明

| 文件 | 说明 |
|------|------|
| `kh-log-plugin.ts` | TypeScript 主文件（推荐） |
| `kh-log-plugin.js` | JavaScript 兼容版本 |
| `types/log-plugin.d.ts` | 类型声明文件 |
| `examples/usage.ts` | 使用示例 |

---

## TypeScript 项目集成

### 1. 复制文件到项目

```bash
# 复制到 uniapp 项目
src/
├── native-plugins/
│   ├── kh-log-plugin.ts       # 主文件
│   └── types/
│       └── log-plugin.d.ts    # 类型声明
```

### 2. 配置 TypeScript

在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    "paths": {
      "@/native-plugins/*": ["src/native-plugins/*"]
    }
  },
  "include": [
    "src/**/*",
    "src/**/*.ts",
    "src/**/*.vue"
  ]
}
```

### 3. 创建 Vue 类型声明（main.ts）

```typescript
// src/types/vue.d.ts
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log: import('@/native-plugins/kh-log-plugin').KHLogPlugin;
  }
}

export {};
```

### 4. 在 main.ts 中初始化

```typescript
import { createSSRApp } from 'vue';
import App from './App.vue';
import $log from './native-plugins/kh-log-plugin';

export function createApp() {
  const app = createSSRApp(App);
  
  // 配置日志插件
  $log.applyConfig({
    tag: 'MyApp',
    enabled: true,
    minLevel: LogLevel.DEBUG
  });
  
  // 拦截 console
  $log.interceptConsole();
  
  // 挂载到全局
  app.config.globalProperties.$log = $log;
  
  return { app };
}
```

---

## TypeScript 使用示例

### 基础用法

```typescript
import $log, { LogLevel, type LogStats } from '@/native-plugins/kh-log-plugin';

// 写入日志
$log.info('应用启动', 'App');
$log.error({ message: '请求失败', code: 500 }, 'API');

// 获取统计
const stats: LogStats = await $log.getStats();
console.log(`日志大小: ${stats.totalSizeReadable}`);
```

### Vue3 Composition API

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import $log from '@/native-plugins/kh-log-plugin';

interface UserInfo {
  id: number;
  name: string;
}

const fetchUser = async (): Promise<void> => {
  $log.info('开始获取用户', 'UserAPI');
  
  try {
    const res = await uni.request({ url: '/api/user' });
    const user = res.data as UserInfo;
    $log.info({ id: user.id }, 'UserAPI');
  } catch (err) {
    $log.error(err as Error, 'UserAPI');
  }
};

onMounted(() => {
  fetchUser();
});
</script>
```

### 创建多个实例

```typescript
import { createLogPlugin, LogLevel } from '@/native-plugins/kh-log-plugin';

// API 专用日志
const apiLogger = createLogPlugin({
  tag: 'API',
  minLevel: LogLevel.INFO
});

// 性能专用日志
const perfLogger = createLogPlugin({
  tag: 'Performance',
  minLevel: LogLevel.DEBUG
});
```

---

## 类型定义详解

### LogLevel

```typescript
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
```

### KHLogPluginConfig

```typescript
interface KHLogPluginConfig {
  tag?: string;           // 默认标签
  enabled?: boolean;      // 是否启用
  autoUpload?: boolean;   // 自动上传
  maxCacheSize?: number;  // 最大缓存数
  flushInterval?: number; // 刷新间隔
  minLevel?: LogLevel;    // 最低级别
}
```

### LogStats

```typescript
interface LogStats {
  totalFiles: number;        // 文件总数
  totalSize: number;         // 总字节数
  totalSizeReadable: string; // 可读大小
  logDirectory: string;      // 目录路径
}
```

---

## 编译说明

TypeScript 文件不需要手动编译，UniApp 会在打包时自动处理。

如果需要编译检查：

```bash
# 安装 TypeScript（如果未安装）
npm install -D typescript

# 类型检查
npx tsc --noEmit
```

---

## 与 JavaScript 版本的区别

| 特性 | TS 版本 | JS 版本 |
|------|---------|---------|
| 类型安全 | ✅ 完全支持 | ❌ 无 |
| IDE 提示 | ✅ 智能提示 | ⚠️ 有限 |
| 编译检查 | ✅ 编译期错误检查 | ❌ 运行时才发现 |
| 代码量 | 稍大（类型定义） | 较小 |
| 使用体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**推荐：在 TypeScript 项目中使用 TS 版本！**
