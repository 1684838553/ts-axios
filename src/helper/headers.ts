import { isPlainObject } from './util'

//处理大小写不匹配问题 ， 如'Content-Type' 和 'content-type')
function normalizeHeadername(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

//请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHeadername(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
}

//响应头
// 用request.getAllResponseHeaders()获取的数据为可换行的字符串，把它转为对象
export function parseHeaders(headers: string): any {
  //创建一个没有原型链的对象
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  // \r回车符  \n换行符
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })
  return parsed
}
