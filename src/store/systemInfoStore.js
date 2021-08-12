/**
 * @Description: 用户手机系统的一些信息
 * @author yeship
 * @date 2021/8/6 15:54
 */

import Taro from '@tarojs/taro'
import {observable} from 'mobx'

const systemInfoStore = observable({
  systemInfo: null,
  async getSystemInfo() {
    if (this.systemInfo === null) {//systemInfo为空的时候才会请求，某则直接返回缓存的数据
      await Taro.getSystemInfo({
        success: res => {
          this.systemInfo = res
        }
      }).then(res => {
      })
    }
    return this.systemInfo
  }
})

export default systemInfoStore
