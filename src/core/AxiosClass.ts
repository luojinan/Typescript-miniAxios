import { AxiosConfig, AxiosPromise, Method } from "../types";
import dispatchRequest from "./dispatchRequest";

export default class AxiosClass {
  request(config: AxiosConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  // 其他如get请求都是把url和config和get合并到一起调用request()方法而已
  get(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}