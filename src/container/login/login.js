import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { login } from '../../redux/user.redux'
import wrapComp from '../../component/comp/comp'
import '../../index.css'
@connect(
  state=>state.user,
  {login}
)
@wrapComp

// class Hello extends React.Component{
//   render(){
//     return <h1>hello ，world</h1>
//   }
// }


// function wrapperHello(Comp){
//   //反向代理
//   class wrapComponent extends Comp{
//     componentDidMount(){
//       console.log('高阶反向代理加载完成')
//     }
//     render(){
//       return(
//         <Comp></Comp>
//       )
//     }
//   }

  //属性代理
//  class wrapComponent extends React.Component{
//     render(){
//       return(
//         <div>
//           <h2>这是react高阶组件</h2>
//           <Comp {...this.props}></Comp>
//         </div>
//       )
//     }
//   }
//   return wrapComponent
// }
// Hello = wrapperHello(Hello)

class Login extends React.Component {
  constructor(props){
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register(){
    this.props.history.push('/register')
  }
  
  handleLogin(){
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <h2>这是登陆页面</h2>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <Button onClick={this.handleLogin} type="primary">登陆</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login