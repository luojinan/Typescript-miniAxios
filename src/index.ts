import AxiosClass from "./core/AxiosClass";
import { extend } from "./helper/utils";
import { AxiosConfig, AxiosInstance, AxiosPromise } from "./types";

function createdInstance():AxiosInstance {
  // 混合对象类,手动继承(拷贝类的所有属性和方法)
  const from = new AxiosClass();
  const to = AxiosClass.prototype.request.bind(from); // request内部用到了this因此需要修正

  extend(to, from);
  return to as AxiosInstance;
}

const axios = createdInstance()

export default axios