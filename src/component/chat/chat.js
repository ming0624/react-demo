import React from 'react'
import {List, InputItem, NavBar ,Icon} from 'antd-mobile'
// import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg ,recvMsg ,readMsg } from '../../redux/chat.redux'
import ListItem from 'antd-mobile/lib/list/ListItem';
import { getChatId } from '../../util';
// const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  { getMsgList, sendMsg ,recvMsg ,readMsg }
)
class Chat extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUnmount(){
    const to = this.props.match.params.user;
    this.props.readMsg(to)
  }
  componentDidMount(){
    if(!this.props.chat.chatMsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
    
    // socket.on('recvmsg',(data)=>{
    //   console.log('接收',data)
    //   this.setState({
    //     msg:[...this.state.msg,data.text]
    //   })
    // })
  }

  handleSubmit(){
    // socket.emit('sendmsg',{text:this.state.text})
    // this.setState({
    //   text:''
    // })
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    console.log(msg)
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }

  render(){
    const userId = this.props.match.params.user;
    const users = this.props.chat.users;
    const chatId = getChatId(userId,this.props.user._id);
    const chatMsgs = this.props.chat.chatMsg.filter(v=>v.chatId === chatId)
    if(!users[userId]){
      return null
    }
    return(
      <div className="chat-page">
        <NavBar 
          mode="dark" 
          icon={<Icon type="left" />}
          onLeftClick={()=> {
            this.props.history.goBack()
          }}
        >{users[userId].name}</NavBar>
      
        <div>
          {chatMsgs.map(v=>{
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userId ?
            ( 
              <List key={v._id}>
                <ListItem
                  thumb={avatar}
                >
                  {v.content}
                </ListItem>
              </List>
            ) :
            (<List key={v._id}>
              <ListItem
                extra={<img src={avatar} alt="" />}
                className="chat-me"
              > 
                {v.content}
              </ListItem>
            </List>)
          })}
          <div className='chat-footer'>
            <div>{`你在聊天和：${this.props.match.params.user}`}</div>
            <List>
              <InputItem
                placeholder='请输入'
                value={this.state.text}
                onChange={v=>{
                  this.setState({
                    text: v
                  })
                }}
                extra={
                  <span onClick={this.handleSubmit}>发送</span>
                }
              >
              消息
              </InputItem>
            </List>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat