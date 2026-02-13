import { useApiLog } from '@/composables/useLog';

const apiLog = useApiLog();

// 请求拦截器
export function requestInterceptor(config: any) {
  // 记录请求日志
  apiLog.request(config.url, config.data || config.params);
  return config;
}

// 响应拦截器
export function responseInterceptor(response: any) {
  // 记录成功响应
  apiLog.response(response.config?.url, response.data);
  return response;
}

// 错误拦截器
export function errorInterceptor(error: any) {
  // 记录错误
  apiLog.error(error.config?.url || 'unknown', error);
  return Promise.reject(error);
}

// 使用示例：
// 在你的请求库中添加拦截器
// request.interceptors.request.use(requestInterceptor);
// request.interceptors.response.use(responseInterceptor, errorInterceptor);
