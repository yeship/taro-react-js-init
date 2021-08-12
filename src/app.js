import { Component } from 'react'
import './app.scss'
import { Provider } from 'mobx-react'
import tabStore from './store/tabStore';
import systemInfoStore from './store/systemInfoStore';

const store = {
  tabStore,
  systemInfoStore,
}

class App extends Component {

  // this.props.children 是将要会渲染的页面
  render () {
    // return this.props.children;
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }

}

export default App
