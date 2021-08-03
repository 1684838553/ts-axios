import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helper/headers'
import { createError } from './helper/error'

// 没有返回值，声明为void
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    //初始化一个请求
    const request = new XMLHttpRequest()

    //如果设置了responseType，赋值
    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      //默认是0，0是永不超时，单位是毫秒
      request.timeout = timeout
    }

    // open() 参数:方法 URL 是否异步执行，默认(可选) 用户名(可选) 密码(可选)
    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      // readyState 已完成
      if (request.readyState !== 4) {
        return
      }

      //网络异常和超时错误，状态码为0
      if (request.status === 0) {
        return
      }

      //将request.getAllResponseHeaders()返回的字符串解析成对象
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        //响应数据
        data: responseData,
        //状态码
        status: request.status,
        statusText: request.statusText,
        //响应头
        headers: responseHeaders,
        config,
        request
      }
      //状态码不是200-300,抛出异常，在这之间，返回data
      handleResponse(response)
    }

    //网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    //网络超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, request))
    }

    //状态码非200
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(`Request failed with status code ${response.status}`, config, null, request)
        )
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
