/**
 * 多处重复定义参数，虽然是给不同的方法用的，但是好繁琐是有必要的？直接一个对象不行吗
 */
import { AxiosConfig, AxiosResponse } from "../types"

// 创建一个继承Error的类 ts的类是可以定义属性的
class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse,
  ){
    super(message); // 把msg信息给原生Error处理
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    // 本来到这里这个类就完成了，传入参数并new就可以取到内部的属性了
    // 但是ts继承原生类有bug https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // 需要手动往类的原型上定义当前继承后的类原型
    // Object.setPrototypeOf(this, AxiosError.prototype) // 好像修复了不需要加
  }
}

// 把new这个类的步骤写成工具方法 返回一个错误信息的定义类，注意不是返回一个类的定义
export function createError(
  message: string,
  config: AxiosConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
):AxiosError{
  return new AxiosError(message, config, code, request, response)
}