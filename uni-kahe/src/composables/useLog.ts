/**
 * 日志插件 Composable
 * 在 Vue3 Composition API 中使用日志功能
 */
import { getCurrentInstance, onMounted, onUnmounted } from 'vue';
import $log, { LogLevel, type KHLogPluginConfig, type LogStats } from '@/JSModules/kh-log-plugin';

export interface UseLogOptions {
  /** 日志标签 */
  tag?: string;
  /** 是否拦截 console */
  interceptConsole?: boolean;
  /** 配置选项 */
  config?: KHLogPluginConfig;
}

/**
 * 使用日志插件
 * @param options 配置选项
 * @example
 * ```ts
 * const { logger, getStats, exportLogs } = useLog({ tag: 'MyPage' });
 * 
 * logger.info('页面加载完成');
 * logger.error('请求失败', error);
 * ```
 */
export function useLog(options: UseLogOptions = {}) {
  const { tag = 'App', config } = options;

  // 如果有配置，应用配置
  if (config) {
    $log.applyConfig(config);
  }

  // 创建带标签的日志方法
  const logger = {
    debug: (message: string | object, customTag?: string) => {
      $log.debug(message, customTag || tag);
    },
    info: (message: string | object, customTag?: string) => {
      $log.info(message, customTag || tag);
    },
    warn: (message: string | object, customTag?: string) => {
      $log.warn(message, customTag || tag);
    },
    error: (message: string | object, customTag?: string) => {
      $log.error(message, customTag || tag);
    },
    /** 写入任意级别日志 */
    write: (message: string | object, level: LogLevel = LogLevel.INFO, customTag?: string) => {
      $log.write(message, level, customTag || tag);
    }
  };

  /** 获取今日日志 */
  const getTodayLog = async (): Promise<string> => {
    try {
      const log = await $log.getTodayLog();
      return log;
    } catch (error) {
      console.error('获取今日日志失败:', error);
      return '';
    }
  };

  /** 获取指定日期日志 */
  const getLogForDate = async (date: string): Promise<string> => {
    try {
      const log = await $log.getLogForDate(date);
      return log;
    } catch (error) {
      console.error('获取日志失败:', error);
      return '';
    }
  };

  /** 导出所有日志 */
  const exportLogs = async (): Promise<string> => {
    try {
      const path = await $log.exportLogs();
      logger.info(`日志导出成功: ${path}`);
      return path;
    } catch (error) {
      logger.error('导出日志失败', error);
      return '';
    }
  };

  /** 获取日志统计信息 */
  const getStats = async (): Promise<LogStats | null> => {
    try {
      const stats = await $log.getStats();
      return stats;
    } catch (error) {
      console.error('获取日志统计失败:', error);
      return null;
    }
  };

  /** 清空所有日志 */
  const clearLogs = async (): Promise<void> => {
    try {
      await $log.clearLogs();
      logger.info('日志已清空');
    } catch (error) {
      logger.error('清空日志失败', error);
    }
  };

  /** 清理旧日志 */
  const clearOldLogs = async (keepDays: number = 7): Promise<void> => {
    try {
      await $log.clearOldLogs(keepDays);
      logger.info(`已清理 ${keepDays} 天前的日志`);
    } catch (error) {
      logger.error('清理旧日志失败', error);
    }
  };

  return {
    // 日志实例
    logger,
    $log,
    LogLevel,
    // 操作方法
    getTodayLog,
    getLogForDate,
    exportLogs,
    getStats,
    clearLogs,
    clearOldLogs
  };
}

/**
 * 性能监控日志
 * @example
 * ```ts
 * const perf = usePerformanceLog();
 * perf.start('api_request');
 * await fetchData();
 * perf.end('api_request');
 * ```
 */
export function usePerformanceLog() {
  const timings = new Map<string, number>();
  const { logger } = useLog({ tag: 'Performance' });

  return {
    /** 开始计时 */
    start: (label: string) => {
      timings.set(label, Date.now());
      logger.debug(`开始: ${label}`);
    },
    /** 结束计时并记录 */
    end: (label: string) => {
      const start = timings.get(label);
      if (start) {
        const duration = Date.now() - start;
        logger.info(`${label}: ${duration}ms`);
        timings.delete(label);
        return duration;
      }
      return 0;
    },
    /** 记录当前值 */
    record: (label: string, value: number) => {
      logger.info(`${label}: ${value}`);
    }
  };
}

/**
 * API 请求日志
 * @example
 * ```ts
 * const apiLog = useApiLog();
 * apiLog.request('/api/user', { id: 1 });
 * apiLog.response('/api/user', { name: '张三' });
 * apiLog.error('/api/user', new Error('网络错误'));
 * ```
 */
export function useApiLog() {
  const { logger } = useLog({ tag: 'API' });

  return {
    /** 记录请求 */
    request: (url: string, params?: object) => {
      logger.info(`→ ${url}`, params ? JSON.stringify(params) : '');
    },
    /** 记录响应 */
    response: (url: string, data?: object) => {
      logger.info(`← ${url}`, data ? JSON.stringify(data) : '');
    },
    /** 记录错误 */
    error: (url: string, error: any) => {
      logger.error(`✗ ${url}`, error instanceof Error ? error.message : String(error));
    }
  };
}

export default useLog;
