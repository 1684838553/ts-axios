import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildURL } from './helper/bulidURL'
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'
function axios(config: AxiosRequestConfig): AxiosPromise {
  //请求配置
  processConfig(config)
  //返回promise相应数据,可以then()获取返回值
  return xhr(config).then(res => {
    //返回的响应数据为string或JSON对象
    return transformResponseData(res)
  })
}

//处理配置
function processConfig(config: AxiosRequestConfig): void {
  //headers 逻辑要在 data之前，data处理完，data变为字符串，而不是对象

  //url上拼接的参数
  config.url = transformURL(config)
  //请求头
  config.headers = transformHeaders(config)
  //请求data
  config.data = transformRequestData(config)
}

//转化URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
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

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
