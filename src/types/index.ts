// 字符串字面量类型(用来约束取值只能是某几个字符串中的一个)
export type Method = 'get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosConfig {
  url: string,
  method?: Method,
  params?: any,
  data?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
}

export interface AxiosResponse {
  status: number,
  statusText: string, // ‘OK‘
  headers: any,
  config: any,
  data: any,
  // request: any, // ?
}

export interface AxiosPromise extends Promise<AxiosResponse> {

}

// 请求promise异常错误信息对象 继承error类
export interface AxiosError extends Error {
  config: AxiosConfig, // 请求参数
  code?: string, // 错误信息关键词？
  request?: any, // 请求对象 为什么是非必输项
  response?: AxiosResponse,
  isAxiosError: boolean, // 不知道哪来干嘛的 跟原生error错误区分？
}

// 定义class类 内部是一些函数这里定义的参数名生效的只有顺序函数名随意==> 函数名(参数:类型):返回类型
export interface AxiosClass {
  request(config: AxiosConfig): AxiosPromise

  get(url: string, config?: AxiosConfig): AxiosPromise

  delete(url: string, config?: AxiosConfig): AxiosPromise

  head(url: string, config?: AxiosConfig): AxiosPromise

  options(url: string, config?: AxiosConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosConfig): AxiosPromise
}


// 混合对象类 axios实例
export interface AxiosInstance extends AxiosClass {
  (config: AxiosConfig):AxiosPromise
}