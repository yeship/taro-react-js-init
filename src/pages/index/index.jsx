import {Component} from 'react'
import {ScrollView, View, Text, Block} from '@tarojs/components'
import {AtButton, AtCheckbox, AtIcon,AtCard,AtList, AtListItem  } from 'taro-ui'
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/card.scss";
import './index.scss'

import { observer, inject } from 'mobx-react'

@inject('tabStore','systemInfoStore')
@observer
export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
    }
    this.list = [
      {
        value: '1',
        label: '封装基本api请求方式',
        desc: '利用@tarojs/taro自带的request封装了get，post请求方式,增加拦截器，token登录'
      },
      {
        value: '2',
        label: '使用mobx管理数据状态',
        desc: '将原来的mobx@4.80更换为mobx-react'
      },
      {
        value: '3',
        label: '使用taro-ui框架',
        desc: 'Taro UI 是一款基于 Taro 框架开发的多端 UI 组件库'
      },
      {
        value: '4',
        label: '增加util类相关工具',
        desc: '比如判断用户浏览器终端信息,通用时间格式转换，将时间戳转换自己需要的格式等'
      },
      {
        value: '5',
        label: '使用cross-env解决h5跨域问题',
        desc: '本地开发调试h5会产生跨域问题'
      },
      {
        value: '6',
        label: '引入高性能实用工具库lodash',
        desc: '比如深拷贝,创建缓存等工具'
      },
      {
        value: '7',
        label: '封装本地存储工具storageTools',
        desc: '利用Taro自带的StorageSync和lodash封装更高效的本地数据持久化工具'
      },
      {
        value: '8',
        label: '引入第三方图标iconfont',
        desc: '配置项目可以使用阿里iconfont图标库'
      },
      {
        value: '9',
        label: '封装自定义tabbar栏',
        desc: '结合mobx刷新tabbar选中状态'
      },
    ]
  }
  

  async componentDidMount() {
    // const systemInfo = await this.props.systemInfoStore.getSystemInfo()
  }

  componentDidShow() {
    const { tabStore } = this.props
    tabStore.changeSelected(0)
  }


  render() {
    return (
      <Block>
        <ScrollView scrollY className='container-tabbar'>
          <View style={{margin:'15px'}}>
            <AtList>
              {
                this.list.map(item => (
                  <AtListItem
                    title={item.label}
                    note={item.desc}
                    arrow='right'
                    thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
                  />
                ))
              }
            </AtList>
          </View>
        </ScrollView>
      </Block>
    )
  }
}
