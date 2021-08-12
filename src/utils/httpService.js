/**
 * @Description: 请求类封装
 * @author yeship
 * @date 2021/7/12 15:27
 */
import Taro, {request} from '@tarojs/taro';
import {pageToLogin} from "./index";
import getServerApiUrl from "./serverApiUrl";

//添加拦截器
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams).then(res => {
    const code = res.statusCode;
    switch (code) {
      case 200:
        return res.data
      case 401:
        Taro.setStorageSync("Authorization", "")
        pageToLogin()
        return Promise.reject("需要鉴权")
      case 403:
        Taro.setStorageSync("Authorization", "")
        pageToLogin()
        return Promise.reject("没有权限访问");
      case 404:
        return Promise.reject("请求资源不存在")
      case 502:
        return Promise.reject("服务端出现了问题")
      default:
        return Promise.reject("未知错误")
    }
  })
}
Taro.addInterceptor(interceptor)
//在请求超时时抛出错误
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

export default class httpService {

   async static commonOptions(url,params, method = "GET") {
    const token = await Taro.getStorageSync('token');
    const option = {
      url: getServerApiUrl(url) + url,
      data: params,
      method: method,
      header: {
        'content-type': "application/json",
      }
    };
    option.header['token'] = token ? token:null
    return request(option);
  }

  static get(url, params) {
    return this.commonOptions(url, params,'GET');
  }

  static post(url, params) {
    return this.commonOptions(url, params, 'POST');
  }

}

