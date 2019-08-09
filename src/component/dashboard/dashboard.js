import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import TabLink from '../tablink/tablink.js'
import {Switch, Route} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import { getMsgList ,recvMsg } from '../../redux/chat.redux'
@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component{
  componentDidMount(){
    if(!this.props.chat.chatMsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render(){
    const user = this.props.user;
    const {pathname} = this.props.location;
    const navList = [
      {
        path: '/boss',
        icon:'job',
        title:'牛人列表',
        text: '牛人',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        icon:'boss',
        title:'boss列表',
        text: 'boss',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        icon:'msg',
        title:'消息中心',
        text: '消息',
        component: Msg
      },
      {
        path: '/me',
        icon:'user',
        title:'个人中心',
        text: '我的',
        component: User
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode="dark">{navList.find(v=>v.path === pathname).title}</NavBar>
        <div style={{paddingTop: 45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <TabLink data={navList}></TabLink>
      </div>
    )
  }
}

export default Dashboard