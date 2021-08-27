import { isObj } from "./utils";

// 支持content-type小写，最终上送大写
function normalizeHeaderName(obj:any, targetKeyName:string){
  if(!obj) {
    return;
  }
  for (const key in obj) {
    const item = obj[key];
    // 当前key不等于targetKeyName，并且当前key和tagetKey转小写之后全等, 证明是同一个变量，修改key来存
    if(key !== targetKeyName && key.toUpperCase() === targetKeyName.toUpperCase()) {
      obj[targetKeyName] = item;
      delete obj[item];
    }
  }
}

export function processHeaders(headers:any, data:any) {
  // 处理headers的content-type参数key大小写
  normalizeHeaderName(headers, 'Content-Type');
  // data是普通对象并且原header配置中存在content-type时,把值修改为json
  // NOTE: 原配置没有header时不手动创建一个header吗
  if(isObj(data) && headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8';
  }
  return headers;
}