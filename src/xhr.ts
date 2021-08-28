import { createError } from "./helper/error";
import { parseHeaders } from "./helper/utils";
import { AxiosConfig, AxiosPromise } from "./types";

function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve,reject)=>{
    // 接收参数method时，给个默认值，否则被字符串字面量类型校验异常
    const { method = 'get', url, data, headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();
    if(timeout) {
      request.timeout = timeout;
    }
    request.open(method.toUpperCase(), url, true);
  
    // 编写请求完成resolve逻辑
    request.onreadystatechange=()=>{
      // 请求失败
      if(request.readyState!==4){
        return;
      }
      // 异常和超时都会进来这里onreadystatechange status为0来判断跳出去
      if(request.status === 0) {
        return;
      }
      // 请求成功
      const res = {
        status: request.status,
        statusText: request.statusText,
        data: responseType && responseType==='text'? request.responseText : request.response,
        headers: parseHeaders(request.getAllResponseHeaders()),

        config,
      }
      // 根据状态码处理状态 为什么300也是失败
      if(request.status>=200 && request.status<300) {
        resolve(res);
      }else{
        reject(createError(
          `Request failed with status code ${request.status}`,
          config,
          null,
          request,
          res,
        ))
      }
    }

    // 处理请求头
    for (const key in headers) {
      // 没有data的时候请求头一定没有content-type,可以节省一点资源(1.直接判断!data不好? 2.为什么要转小写来判断)
      if(data === null && key.toLowerCase() === "content-type"){
        delete headers[key];
      }else {
        const item = headers[key];
        request.setRequestHeader(key,item); // 设置xhr请求需要一个一个设置
      }
    }
    request.send(data);

    // xhr发送异常
    request.onerror = ()=>{
      reject(createError(
        'Network Eroor',
        config,
        null,
        request,
      ))
    }
    // xhr响应异常 超时
    request.ontimeout = ()=>{
      reject(createError(
        `Timeout of ${timeout}ms exceeded`,
        config,
        'ECONNABORTED', // 约定俗称的错误标识吗？专门定一个code来给超时情况?
        request,
      ))
    }
  })
}

export default xhr;