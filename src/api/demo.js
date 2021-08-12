/**
 * @Description: 接口中心demo
 * @author yeship
 * @date 2021/7/21 09:21
 */
import httpService from "../utils/httpService";

export const getDemoData = (params) => {
  return httpService.post('/api/test/test', params)
}
