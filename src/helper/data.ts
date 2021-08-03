import { isPlainObject } from './util'

//处理请求data
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

//处理响应data
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // 为普通字符串，原样输出
    }
  }
  return data
}
