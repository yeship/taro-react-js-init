/**
 * @Description:
 * @author yeship
 * @date 2021/8/3 10:13
 */
import {Component} from 'react'
import {View, Text} from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import { observer, inject } from 'mobx-react'

@inject('tabStore')
@observer
export default class User extends Component {


  componentDidMount() {
  }


  componentDidShow() {
    const { tabStore } = this.props
    tabStore.changeSelected(1)
  }

  componentDidHide() {}

  render() {
    return ( <View >
        <Text > Hello user! </Text> </View >
    )
  }
}
