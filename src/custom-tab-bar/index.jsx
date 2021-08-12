/**
 * @Description: 自定义tabbar
 * @author yeship
 * @date 2021/8/3 10:03
 */
import Taro from '@tarojs/taro'
import {Component} from 'react'
import {CoverView, CoverImage, Button} from '@tarojs/components'
import './index.scss'
import config from '../app.config'
import { observer, inject } from 'mobx-react';

@inject('tabStore')
@observer
class customTabBar extends Component {

  constructor() {
    super(...arguments);
    this.state = {}
  }

  componentDidMount() {
    const { tabBar: { color, selectedColor, list }} = config
    const conversionList = this.conversionListPath(list)
    this.setState({
      color,
      selectedColor,
      list: conversionList
    })
  }

  //切换tab栏
  changeTab = (item) => {
    Taro.switchTab({url: item.pagePath})
  }

  //跳转到自定义页面
  toCustomizePage = () => {
    Taro.navigateTo({url: '/pages/customize/index'})
  }

  //转换路径,app.config.js里面的路径没有/,在这个页面需要加上/
  conversionListPath = (list) => {
    return JSON.parse(JSON.stringify(list).replace(/pages/g, '/pages').replace(/assets/g, '/assets'));
  }

  render() {
    const { tabStore: { selected } } = this.props
    const { color, selectedColor, list } = this.state
    return (
      <CoverView className='tab-bar'>
        <CoverView className='tab-bar-wrap'>
          {
            list && list.map((item, index) => (
              <CoverView className='tab-bar-wrap-item'
                         onClick={() => this.changeTab(item)}
                         data-path={item.pagePath}
                         key={index}
              >
                <CoverImage className='tab-bar-wrap-item-icon' src={selected === index ? item.selectedIconPath : item.iconPath}/>
                <CoverView className='tab-bar-wrap-item-btn' style={{color: selected === index ? selectedColor : color}}>
                  {item.text}
                </CoverView>
              </CoverView>
            ))
          }
        </CoverView>
        {/*自定义区域，可根据自己需要换成图片等等*/}
        <CoverView className='button-icon' onClick={() => this.toCustomizePage()}>
          <Button size='mini' className='btn'>泰 罗</Button>
        </CoverView>
      </CoverView>
    )
  }
}

export default customTabBar
