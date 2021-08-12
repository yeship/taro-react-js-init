/**
 * @Description: 配置不同环境的服务器地址
 * @author yeship
 * @date 2021/7/15 16:11
 */
const getServerApiUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {//开发环境
      BASE_URL = 'http://192.168.124.10:8090/api/'
  } else {// 生产环境，体验环境
      BASE_URL = 'http://192.168.124.10:8090/api/'
  }
  return BASE_URL
}

export default getServerApiUrl;
