import { isObj } from "./utils";

export function transformRequestData(data: any) {
  // 1. 是普通对象时转化为json
  if(isObj(data)) {
    return JSON.stringify(data);
  }
  return data;
}