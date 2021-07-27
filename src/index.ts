import { AxiosRequestConfig, AxiosPromise } from './types/index'
import xhr from './xhr'
import { buildURL } from './helper/bulidURL'
import { transformRequest } from './helper/data'
import { processHeaders } from './helper/headers'
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

//处理配置
function processConfig(config: AxiosRequestConfig): void {
  //headers 逻辑要在 data之前，data处理完，data变为字符串，而不是对象
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

//转化URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

//转化data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

//转化headers
function transformHeaders(config: AxiosRequestConfig): any {
  //默认值为{}
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
