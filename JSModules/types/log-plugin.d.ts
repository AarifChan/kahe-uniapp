/**
 * 卡核潮玩 - 原生日志插件类型声明
 */

export {};

declare global {
  interface Uni {
    requireNativePlugin(name: 'KHLogPlugin'): NativeLogPlugin | null;
  }
}

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  message: string;
  level: LogLevel | string;
  tag: string;
  time: number;
}

export interface RawLogData {
  message: string;
  level?: string;
  tag?: string;
}

export interface LogStats {
  totalFiles: number;
  totalSize: number;
  totalSizeReadable: string;
  logDirectory: string;
}

export interface PluginResponse<T = any> {
  code: number;
  msg: string;
  data?: T;
  path?: string;
  count?: number;
}

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

export interface KHLogPluginConfig {
  tag?: string;
  enabled?: boolean;
  autoUpload?: boolean;
  maxCacheSize?: number;
  flushInterval?: number;
  minLevel?: LogLevel;
}

export declare class KHLogPlugin {
  constructor(config?: KHLogPluginConfig);
  applyConfig(config?: KHLogPluginConfig): this;
  setTag(tag: string): this;
  setEnabled(enabled: boolean): this;
  setMinLevel(level: LogLevel): this;
  debug(message: string | object, tag?: string): this;
  info(message: string | object, tag?: string): this;
  warn(message: string | object, tag?: string): this;
  error(message: string | object, tag?: string): this;
  write(message: string | object, level?: LogLevel, tag?: string): this;
  writeBatch(logs: RawLogData[]): Promise<PluginResponse>;
  getTodayLog(): Promise<string>;
  getLogForDate(date: string): Promise<string>;
  exportLogs(): Promise<string>;
  getStats(): Promise<LogStats>;
  clearLogs(): Promise<void>;
  clearOldLogs(keepDays?: number): Promise<void>;
  interceptConsole(): this;
}

export declare function createLogPlugin(config?: KHLogPluginConfig): KHLogPlugin;
export declare const $log: KHLogPlugin;
export default $log;
