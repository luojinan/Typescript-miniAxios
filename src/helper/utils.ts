const toStringFunc = Object.prototype.toString

// 类型保护？目的
export function isDateObj(val: any): val is Date {
  return toStringFunc.call(val) === '[object Date]'  
}

export function isObj(val: any): val is Object {
  return toStringFunc.call(val) === '[object Object]'; // 注意第二个object是大些
}

// encode参数,但保留特殊字符
export function encodeValue(val:string):string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']');
}

export function parseHeaders(headersString: string) {
  let newObj:any = {};
  if(!headersString){
    return newObj;
  }

  headersString.split('\r\n').forEach(item=>{
    let [key,val] = item.split(':');
    if(!key) {
      return
    }
    if(val) {
      val.trim();
    }
    newObj[key] = val;
  })
  return newObj;
}

// 合并函数和类形成混合对象类的工具方法 用断言辅助ts识别类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    const fromItem = from[key] as any;
    (to as T & U )[key] = fromItem
  }
  return to as T & U;
}