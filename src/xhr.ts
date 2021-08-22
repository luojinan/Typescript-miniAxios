import { AxiosConfig } from "./types";

function xhr(config: AxiosConfig) {
  // 接收参数method时，给个默认值，否则被字符串字面量类型校验异常
  const { method = 'get', url, data } = config;
  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);
  request.send(data);
}

export default xhr;