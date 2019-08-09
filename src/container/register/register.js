import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import wrapComp from '../../component/comp/comp'
import '../../index.css'
@connect(
  state=>state.user,
  {register}
)
@wrapComp

class Register extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //   user:'',
    //   pwd:'',
    //   repeatpwd:'',
    //   type: 'genius' //boss
    // }
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  
  handleRegister(){
    this.props.register(this.props.state)
    console.log(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem
            onChange={v=>this.props.handleChange('user',v)}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type="password"
            onChange={v=>this.props.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type="password"
            onChange={v=>this.props.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem 
            onChange={()=>this.props.handleChange('type','genius')}
            checked={this.props.state.type === "genius"}>
            牛人
          </RadioItem>
          <RadioItem 
            onChange={()=>this.props.handleChange('type','boss')}
            checked={this.props.state.type === "boss"}>
            boss
          </RadioItem>
          <WhiteSpace/>
          <Button
            onClick={this.handleRegister}
            type="primary">注册</Button>
        </List>
      </div>
    )
  }
}

export default Register