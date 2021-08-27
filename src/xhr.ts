import { AxiosConfig } from "./types";

function xhr(config: AxiosConfig) {
  // 接收参数method时，给个默认值，否则被字符串字面量类型校验异常
  const { method = 'get', url, data, headers } = config;
  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);

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
}

export default xhr;