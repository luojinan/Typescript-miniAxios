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