import { AxiosRequestConfig } from './types/index'

// 没有返回值，声明为void
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  //初始化一个请求
  const request = new XMLHttpRequest()
  // open() 参数:方法 URL 是否异步执行，默认(可选) 用户名(可选) 密码(可选)
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
