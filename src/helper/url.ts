import { encodeValue, isDateObj, isObj } from "./utils";

// 处理get请求的params参数成字符串
export function buildUrl(url:string, params?:any):any {
  // 没有传递params时,不处理url
  if(!params) {
    return;
  }

  const paramsStringList:string[] = [];

  // 遍历params对象
  for (let key in params) {
    let val = params[key];
    // 1. 过滤null、undefined的值
    if(val === null || typeof val === 'undefined') {
      return; // 跳出当前循环进行下一循环
    }
    // 2. 处理数组类型的值 xxx?list[]=a&list[]=b'
    if(Array.isArray(val)) {
      key += '[]'; //key拼上[]
    } else {
      // 对象、字符串、数字参数转换为数组方便处理
      val = [val];
    }

    // 对值(转化为数组了)做遍历处理,非数组参数就是1次结束
    val.forEach((item:any) => {
      // 3. 日期对象参数
      if(isDateObj(item)) {
        // toISOString() ISO格式的字符串：YYYY-MM-DDTHH:mm:ss.sssZ
        item = item.toISOString();
      }else if(isObj(item)){
        // 4. 对象类型转json
        item = JSON.stringify(item);
      }
      // 5.encode参数,但保留特殊字符
      paramsStringList.push(`${encodeValue(key)}=${encodeValue(item)}`)
    });
  }

  // 用&拼接所有参数
  const paramsString = paramsStringList.join('&');

  if(paramsString) {
    // 6.去除原urlhash部分
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 拼接url和参数字符串 处理?
    const connectString = url.indexOf('?') === -1 ? '?' : '&';
    url += connectString + paramsString;
  }

  return url;
}
