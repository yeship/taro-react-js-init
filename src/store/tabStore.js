/**
 * @Description: tabbar栏的数据
 * @author yeship
 * @date 2021/8/4 15:01
 */
import { observable } from 'mobx'

const tabStore = observable({
  selected: 0,
  changeSelected(index){
    this.selected = index;
  },
})

export default tabStore
