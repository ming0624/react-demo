import React from 'react'
import {connect} from 'react-redux'
import { Result, Button,WingBlank ,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import{logoutSubmit} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
)

class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(){
    const alert = Modal.alert;
    alert('退出登陆', '确认要退出吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userId')
        this.props.logoutSubmit()
        console.log('tuichu')
      }}
    ])
  }
  render(){
    const props = this.props;
    console.log("33",props)
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:45}} alt="" />}
          title={props.user}
          message={props.type==='boss' ? props.company : null}
        />
        <WingBlank>
        <Button type="primary" onClick={this.logout}>退出登陆</Button>
        </WingBlank>
        
      </div>
      
    ) : <Redirect to={props.redirectTo} />
  }
}

export default User