import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 拦截器
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any

  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}
//AxiosRequestConfig拓展拦截器
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
