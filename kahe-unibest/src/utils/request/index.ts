/**
 * 兼容层：模拟 uni-kahe 的 request 接口
 * 后端响应格式: { status: number, data: T, msg: string }
 * 返回格式: { code: number, data: T, msg: string }
 * 注意：URL 前缀和 Authorization header 由 kahe-unibest 的请求拦截器自动注入
 * @see src/http/interceptor.ts
 */

interface BaseResponse<T> { code: number, data: T, msg: string }

function request<R = any, T = any>({ methodType = 'GET', url = '', data = {} as T }: { methodType?: string, url: string, data?: T }): Promise<BaseResponse<R>> {
  return new Promise((resolve) => {
    uni.request({
      url,
      // @ts-ignore
      method: methodType,
      data: data as any,
      timeout: 60000,
      success: (res) => {
        const obj = res.data as any
        // 后端用 status 字段返回业务码
        const code = (obj?.status ?? obj?.code ?? 0) as number
        resolve({
          code,
          data: obj?.data as R,
          msg: obj?.msg || '',
        })
      },
      fail: (err) => {
        resolve({ code: 404, data: {} as R, msg: err?.errMsg || 'network error' })
      },
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function get<R = any, T = any>(url: string, data?: T, _opts?: any): Promise<BaseResponse<R>> {
  return request<R, T>({ methodType: 'GET', url, data })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function post<R = any, T = any>(url: string, data?: T, _opts?: any): Promise<BaseResponse<R>> {
  return request<R, T>({ methodType: 'POST', url, data })
}
