import { createSSRApp } from "vue";
import App from "./App.vue";
import $log, { LogLevel } from "./JSModules/kh-log-plugin";

export function createApp() {
  const app = createSSRApp(App);

  // 配置日志插件
  $log.applyConfig({
    tag: 'KaHeApp',
    enabled: true,
    minLevel: LogLevel.DEBUG,
    maxCacheSize: 100,
    flushInterval: 5000
  });

  // 拦截 console 方法，将所有 console 输出同时写入日志文件
  $log.interceptConsole();

  // 挂载到全局属性，方便在模板中使用
  app.config.globalProperties.$log = $log;

  // 写入启动日志
  $log.info('应用启动', 'App');

  return {
    app,
  };
}

// 导出日志实例，方便外部使用
export { $log, LogLevel };
