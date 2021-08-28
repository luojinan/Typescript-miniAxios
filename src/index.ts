import { processHeaders } from "./helper/header";
import { transformRequestData } from "./helper/transformRequestData";
import { buildUrl } from "./helper/url";
import { AxiosConfig, AxiosPromise } from "./types";
import xhr from "./xhr";

function axios(config: AxiosConfig):AxiosPromise {
  // TODO
  processConfig(config); // 处理请求参数
  return xhr(config);
}

// 利用浅拷贝直接修改原对象 不return值
function processConfig(config: AxiosConfig) {
  config.url = transformUrl(config); // 1. 处理get请求的params参数到url
  config.headers = transformtHeaders(config); // 2. 处理请求头参数(在data前，是因为要用到未转化为json的data)
  config.data = transformtData(config); // 3. 处理post请求的data参数
}

// 处理params参数
function transformUrl(config: AxiosConfig) {
  return buildUrl(config.url, config.params);
}
// 处理data参数
function transformtData(config: AxiosConfig) {
  return transformRequestData(config.data);
}
// 处理headers参数
function transformtHeaders(config: AxiosConfig) {
  return processHeaders(config.headers = {}, config.data);
}

export default axios