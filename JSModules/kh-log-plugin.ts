/**
 * 卡核潮玩 - 原生日志插件 TypeScript 版本
 * 用于将 uniapp 日志保存到本地文件
 */

// ==================== 类型定义 ====================

/** 日志级别 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

/** 日志条目 */
export interface LogEntry {
  message: string;
  level: LogLevel | string;
  tag: string;
  time: number;
}

/** 原始日志数据（用于批量写入） */
export interface RawLogData {
  message: string;
  level?: string;
  tag?: string;
}

/** 日志统计信息 */
export interface LogStats {
  totalFiles: number;
  totalSize: number;
  totalSizeReadable: string;
  logDirectory: string;
}

/** 插件响应结果 */
export interface PluginResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
  path?: string;
  count?: number;
}

/** 原生插件接口 */
export interface NativeLogPlugin {
  writeLog(options: { message: string; level?: string; tag?: string }): void;
  writeLogs(options: { logs: RawLogData[] }, callback?: (res: PluginResponse) => void): void;
  getTodayLog(options: Record<string, never>, callback?: (res: PluginResponse<string>) => void): void;
  getLogForDate(options: { date: string }, callback?: (res: PluginResponse<string>) => void): void;
  exportLogs(options: Record<string, never>, callback?: (res: PluginResponse) => void): void;
  clearLogs(options: Record<string, never>, callback?: (res: PluginResponse) => void): void;
  clearOldLogs(options: { keepDays: number }, callback?: (res: PluginResponse) => void): void;
  getLogStats(options: Record<string, never>, callback?: (res: PluginResponse<LogStats>) => void): void;
}

// ==================== 配置接口 ====================

export interface KHLogPluginConfig {
  /** 默认标签 */
  tag?: string;
  /** 是否启用 */
  enabled?: boolean;
  /** 自动上传 */
  autoUpload?: boolean;
  /** 最大缓存数量 */
  maxCacheSize?: number;
  /** 刷新间隔（毫秒） */
  flushInterval?: number;
  /** 最低日志级别 */
  minLevel?: LogLevel;
}

// ==================== 主类实现 ====================

/**
 * 日志插件主类
 */
export class KHLogPlugin {
  private tag: string = 'APP';
  private enabled: boolean = true;
  private autoUpload: boolean = false;
  private maxCacheSize: number = 100;
  private cache: LogEntry[] = [];
  private flushInterval: number = 5000;
  private minLevel: LogLevel = LogLevel.DEBUG;
  private nativePlugin: NativeLogPlugin | null = null;
  private consoleIntercepted: boolean = false;

  /**
   * 日志级别权重（用于过滤）
   */
  private static readonly LEVEL_WEIGHT: Record<LogLevel, number> = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 3
  };

  constructor(config?: KHLogPluginConfig) {
    this.applyConfig(config);
    this.initNativePlugin();
    this.startAutoFlush();
  }

  // ==================== 配置方法 ====================

  /**
   * 应用配置
   */
  applyConfig(config?: KHLogPluginConfig): this {
    if (!config) return this;
    
    if (config.tag !== undefined) this.tag = config.tag;
    if (config.enabled !== undefined) this.enabled = config.enabled;
    if (config.autoUpload !== undefined) this.autoUpload = config.autoUpload;
    if (config.maxCacheSize !== undefined) this.maxCacheSize = config.maxCacheSize;
    if (config.flushInterval !== undefined) this.flushInterval = config.flushInterval;
    if (config.minLevel !== undefined) this.minLevel = config.minLevel;
    
    return this;
  }

  setTag(tag: string): this {
    this.tag = tag;
    return this;
  }

  setEnabled(enabled: boolean): this {
    this.enabled = enabled;
    return this;
  }

  setMinLevel(level: LogLevel): this {
    this.minLevel = level;
    return this;
  }

  // ==================== 日志写入方法 ====================

  debug(message: string | object, tag?: string): this {
    return this.write(message, LogLevel.DEBUG, tag);
  }

  info(message: string | object, tag?: string): this {
    return this.write(message, LogLevel.INFO, tag);
  }

  warn(message: string | object, tag?: string): this {
    return this.write(message, LogLevel.WARN, tag);
  }

  error(message: string | object, tag?: string): this {
    return this.write(message, LogLevel.ERROR, tag);
  }

  /**
   * 通用写入方法
   */
  write(message: string | object, level: LogLevel = LogLevel.INFO, tag?: string): this {
    if (!this.enabled) return this;
    
    // 级别过滤
    if (KHLogPlugin.LEVEL_WEIGHT[level] < KHLogPlugin.LEVEL_WEIGHT[this.minLevel]) {
      return this;
    }

    const logTag = tag || this.tag;
    const logMessage = typeof message === 'object' ? JSON.stringify(message) : String(message);

    this.cache.push({
      message: logMessage,
      level: level,
      tag: logTag,
      time: Date.now()
    });

    if (this.nativePlugin?.writeLog) {
      this.nativePlugin.writeLog({
        message: logMessage,
        level: level,
        tag: logTag
      });
    }

    if (this.cache.length >= this.maxCacheSize) {
      this.flush();
    }

    return this;
  }

  // ==================== 批量操作方法 ====================

  writeBatch(logs: RawLogData[]): Promise<PluginResponse> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.writeLogs) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.writeLogs({ logs }, (res) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(new Error(res.msg || '批量写入失败'));
        }
      });
    });
  }

  // ==================== 查询方法 ====================

  getTodayLog(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.getTodayLog) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.getTodayLog({}, (res) => {
        if (res.code === 0) {
          resolve(res.data || '');
        } else {
          reject(new Error(res.msg || '获取日志失败'));
        }
      });
    });
  }

  getLogForDate(date: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.getLogForDate) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.getLogForDate({ date }, (res) => {
        if (res.code === 0) {
          resolve(res.data || '');
        } else {
          reject(new Error(res.msg || '获取日志失败'));
        }
      });
    });
  }

  exportLogs(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.exportLogs) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.exportLogs({}, (res) => {
        if (res.code === 0 && res.path) {
          resolve(res.path);
        } else {
          reject(new Error(res.msg || '导出日志失败'));
        }
      });
    });
  }

  getStats(): Promise<LogStats> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.getLogStats) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.getLogStats({}, (res) => {
        if (res.code === 0 && res.data) {
          resolve(res.data);
        } else {
          reject(new Error(res.msg || '获取统计失败'));
        }
      });
    });
  }

  // ==================== 清理方法 ====================

  clearLogs(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.clearLogs) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.clearLogs({}, (res) => {
        if (res.code === 0) {
          this.cache = [];
          resolve();
        } else {
          reject(new Error(res.msg || '清空日志失败'));
        }
      });
    });
  }

  clearOldLogs(keepDays: number = 7): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.nativePlugin?.clearOldLogs) {
        reject(new Error('原生插件未加载'));
        return;
      }

      this.nativePlugin.clearOldLogs({ keepDays }, (res) => {
        if (res.code === 0) {
          resolve();
        } else {
          reject(new Error(res.msg || '清理日志失败'));
        }
      });
    });
  }

  // ==================== 控制台拦截 ====================

  interceptConsole(): this {
    if (this.consoleIntercepted) return this;
    
    this.consoleIntercepted = true;

    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args: any[]) => {
      originalLog.apply(console, args);
      this.write(args.map(a => this.stringifyArg(a)).join(' '), LogLevel.DEBUG);
    };

    console.info = (...args: any[]) => {
      originalInfo.apply(console, args);
      this.write(args.map(a => this.stringifyArg(a)).join(' '), LogLevel.INFO);
    };

    console.warn = (...args: any[]) => {
      originalWarn.apply(console, args);
      this.write(args.map(a => this.stringifyArg(a)).join(' '), LogLevel.WARN);
    };

    console.error = (...args: any[]) => {
      originalError.apply(console, args);
      this.write(args.map(a => this.stringifyArg(a)).join(' '), LogLevel.ERROR);
    };

    return this;
  }

  // ==================== 私有方法 ====================

  private initNativePlugin(): void {
    try {
      const uniAny = uni as any;
      this.nativePlugin = uniAny.requireNativePlugin?.('KHLogPlugin') || null;
    } catch (e) {
      console.warn('[KHLogPlugin] 原生插件加载失败:', e);
      this.nativePlugin = null;
    }
  }

  private stringifyArg(arg: any): string {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg);
      } catch {
        return '[Object]';
      }
    }
    return String(arg);
  }

  private flush(): void {
    if (this.cache.length === 0) return;

    const logs = this.cache.splice(0, this.cache.length);
    this.writeBatch(logs.map(log => ({
      message: log.message,
      level: log.level,
      tag: log.tag
    }))).catch(err => {
      console.error('[KHLogPlugin] 批量写入失败:', err);
    });
  }

  private startAutoFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }
}

// ==================== 便捷函数 ====================

export function createLogPlugin(config?: KHLogPluginConfig): KHLogPlugin {
  return new KHLogPlugin(config);
}

export const $log = new KHLogPlugin();

export default $log;
