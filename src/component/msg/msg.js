import React from  'react' 
import { connect } from 'react-redux'
import { List ,Badge } from 'antd-mobile'
@connect(
  state=>state
)

class Msg extends React.Component{

  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    console.log('121',this.props)
    //按照聊天用户分组 根据chatid
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userInfo = this.props.chat.users
    const msgGroup ={}
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    }); 
    console.log(msgGroup)
    const chatList = Object.values(msgGroup).sort((a, b)=>{
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      
      return b_last - a_last
    })
    console.log("chatList",chatList)
    return(
      <div>
        消息列表
        <List>
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter(v=> !v.read&&v.to===userid).length
            const name = userInfo[targetId].name
            const avatar = userInfo[targetId].avatar
            return (
              <Item
                key={lastItem._id}
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${avatar}.png`)}
                arrow="horizontal"
                onClick={()=>{
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
              {lastItem.content}
              <Brief>{name}</Brief>
              </Item>
            )
          })}
          
        </List>
      </div>
    )
  }
}

export default Msg