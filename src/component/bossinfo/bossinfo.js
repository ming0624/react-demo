import React from 'react'
import {NavBar, InputItem, TextareaItem, WingBlank, Button} from 'antd-mobile'
import AvatarSelect from '../avatar-select/avatar-select'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state => state.user,
  {update}
)
class Bossinfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',

    }
  }
  onChange(key, val){
    this.setState({
      [key]:val
    })
  }
  render(){
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark" >Boss完善信息</NavBar>
        <AvatarSelect
            selectAvatar={imgname => {
              this.setState({
                avatar: imgname
              })
            }}
         >
        </AvatarSelect>
        <InputItem onChange={(v) => this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem 
          rows={3}
          autoHeight
          title="职位简介"
          onChange={(v) => this.onChange('desc',v)}>
        </TextareaItem>
        <WingBlank >
           <Button  
           onClick={() => {
             this.props.update(this.state)
           }}
           type='primary'>保存</Button>
        </WingBlank>  
      </div>
    )
  }
}

export default Bossinfo