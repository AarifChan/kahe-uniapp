/**
 * 卡核潮玩 - 日志插件 TypeScript 使用示例
 */

// 导入方式 1：使用默认导出（推荐）
import $log from '../kh-log-plugin';

// 导入方式 2：按需导入
import { 
  KHLogPlugin, 
  LogLevel, 
  createLogPlugin,
  type LogStats,
  type KHLogPluginConfig 
} from '../kh-log-plugin';

// ==================== 基础用法 ====================

// 在 main.ts 中初始化
export function initLogPlugin(): void {
  $log.applyConfig({
    tag: 'MyApp',
    enabled: true,
    minLevel: LogLevel.DEBUG,
    maxCacheSize: 100,
    flushInterval: 5000
  });

  $log.interceptConsole();
  console.log('日志插件初始化完成');
}

// ==================== Vue3 Composition API 用法 ====================

import { ref, onMounted } from 'vue';

export function useLogger(tag: string) {
  const isReady = ref(false);

  onMounted(() => {
    isReady.value = true;
  });

  const logger = {
    debug: (msg: string | object) => $log.debug(msg, tag),
    info: (msg: string | object) => $log.info(msg, tag),
    warn: (msg: string | object) => $log.warn(msg, tag),
    error: (msg: string | object) => $log.error(msg, tag)
  };

  return { logger, isReady };
}

// ==================== 性能监控示例 ====================

export class PerformanceMonitor {
  private timings = new Map<string, number>();

  startTiming(label: string): void {
    this.timings.set(label, Date.now());
    $log.debug(`[Performance] 开始: ${label}`, 'Performance');
  }

  endTiming(label: string): void {
    const start = this.timings.get(label);
    if (start) {
      const duration = Date.now() - start;
      $log.info(`[Performance] ${label}: ${duration}ms`, 'Performance');
      this.timings.delete(label);
    }
  }
}

// ==================== 类型守卫示例 ====================

function isLogStats(obj: any): obj is LogStats {
  return obj && 
    typeof obj.totalFiles === 'number' &&
    typeof obj.totalSize === 'number';
}

export async function getLogStatsSafe(): Promise<LogStats | null> {
  try {
    const stats = await $log.getStats();
    return isLogStats(stats) ? stats : null;
  } catch {
    return null;
  }
}
