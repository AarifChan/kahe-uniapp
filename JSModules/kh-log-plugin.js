/**
 * 卡核潮玩 - 原生日志插件 JS 封装
 * 用于将 uniapp 日志保存到本地文件
 */

// 日志级别定义
const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

// 原生插件引用
let nativePlugin = null;

// 获取原生插件实例
function getNativePlugin() {
  if (!nativePlugin) {
    try {
      nativePlugin = uni.requireNativePlugin('KHLogPlugin');
    } catch (e) {
      console.error('[KHLogPlugin] 原生插件加载失败:', e);
      return null;
    }
  }
  return nativePlugin;
}

/**
 * 日志插件主类
 */
class KHLogPlugin {
  constructor() {
    this.tag = 'APP';
    this.enabled = true;
    this.autoUpload = false;
    this.maxCacheSize = 100;
    this.cache = [];
    this.flushInterval = 5000; // 5秒自动刷新
    
    this._startAutoFlush();
    this._interceptConsole();
  }
  
  /**
   * 设置标签
   */
  setTag(tag) {
    this.tag = tag;
    return this;
  }
  
  /**
   * 启用/禁用日志
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    return this;
  }
  
  /**
   * 写入 DEBUG 日志
   */
  debug(message, tag = null) {
    return this._write(message, LogLevel.DEBUG, tag);
  }
  
  /**
   * 写入 INFO 日志
   */
  info(message, tag = null) {
    return this._write(message, LogLevel.INFO, tag);
  }
  
  /**
   * 写入 WARN 日志
   */
  warn(message, tag = null) {
    return this._write(message, LogLevel.WARN, tag);
  }
  
  /**
   * 写入 ERROR 日志
   */
  error(message, tag = null) {
    return this._write(message, LogLevel.ERROR, tag);
  }
  
  /**
   * 内部写入方法
   */
  _write(message, level = LogLevel.INFO, tag = null) {
    if (!this.enabled) return;
    
    const logTag = tag || this.tag;
    const logMessage = typeof message === 'object' ? JSON.stringify(message) : String(message);
    
    // 添加到缓存
    this.cache.push({
      message: logMessage,
      level: level,
      tag: logTag,
      time: Date.now()
    });
    
    // 立即写入单条日志到原生
    const plugin = getNativePlugin();
    if (plugin && plugin.writeLog) {
      plugin.writeLog({
        message: logMessage,
        level: level,
        tag: logTag
      });
    }
    
    // 缓存过多时刷新
    if (this.cache.length >= this.maxCacheSize) {
      this._flush();
    }
    
    return this;
  }
  
  /**
   * 批量写入日志
   */
  writeBatch(logs) {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.writeLogs) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.writeLogs({ logs }, (res) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 获取今日日志
   */
  getTodayLog() {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.getTodayLog) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.getTodayLog({}, (res) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 获取指定日期日志
   */
  getLogForDate(date) {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.getLogForDate) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.getLogForDate({ date }, (res) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 导出日志
   */
  exportLogs() {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.exportLogs) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.exportLogs({}, (res) => {
        if (res.code === 0) {
          resolve(res.path);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 清空所有日志
   */
  clearLogs() {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.clearLogs) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.clearLogs({}, (res) => {
        if (res.code === 0) {
          this.cache = [];
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 清空旧日志
   */
  clearOldLogs(keepDays = 7) {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.clearOldLogs) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.clearOldLogs({ keepDays }, (res) => {
        if (res.code === 0) {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 获取日志统计
   */
  getStats() {
    const plugin = getNativePlugin();
    if (!plugin || !plugin.getLogStats) return Promise.reject('插件未加载');
    
    return new Promise((resolve, reject) => {
      plugin.getLogStats({}, (res) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res);
        }
      });
    });
  }
  
  /**
   * 刷新缓存到文件
   */
  _flush() {
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
  
  /**
   * 启动自动刷新
   */
  _startAutoFlush() {
    setInterval(() => {
      this._flush();
    }, this.flushInterval);
  }
  
  /**
   * 拦截 console 方法
   */
  _interceptConsole() {
    const originalLog = console.log;
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.log = (...args) => {
      originalLog.apply(console, args);
      this._write(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), LogLevel.DEBUG);
    };
    
    console.info = (...args) => {
      originalInfo.apply(console, args);
      this._write(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), LogLevel.INFO);
    };
    
    console.warn = (...args) => {
      originalWarn.apply(console, args);
      this._write(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), LogLevel.WARN);
    };
    
    console.error = (...args) => {
      originalError.apply(console, args);
      this._write(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '), LogLevel.ERROR);
    };
  }
}

// 创建全局实例
const $log = new KHLogPlugin();

// 导出
export default $log;
export { KHLogPlugin, LogLevel };

// 兼容 CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = $log;
}
