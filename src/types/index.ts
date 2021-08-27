// 字符串字面量类型(用来约束取值只能是某几个字符串中的一个)
type Method = 'get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosConfig {
  url: string,
  method?: Method,
  params?: any,
  data?: any,
  headers?: any,
}