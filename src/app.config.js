export default {
  pages: [
    'pages/index/index',
    'pages/user/index',
    'pages/customize/index'
  ],
  window: {
    // navigationStyle: 'custom', //自定义导航栏
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#515151',
    selectedColor: '#32a1ec',
    backgroundColor: '#f4f4f4',
    borderStyle: 'black',
    custom: true,
    list: [{
      pagePath: 'pages/index/index',
      iconPath: 'assets/img/tabbar/home.png',
      selectedIconPath: 'assets/img/tabbar/home-s.png',
      text: '主页'
    }, {
      pagePath: 'pages/user/index',
      iconPath: 'assets/img/tabbar/user.png',
      selectedIconPath: 'assets/img/tabbar/user-s.png',
      text: '我的'
    }]
  },
}
