import Axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

//消息列表
const MSG_LIST = 'MSG_LIST'
//读取消息
const MSG_RECV = 'MSG_RECV'
//消息是否已读标识
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  users:{},
  unRead: 0
}

export function chat(state=initState, action){
  
  switch (action.type) {
    case MSG_LIST:
      console.log(action.payload)
      return {...state ,users: action.payload.users, chatMsg:action.payload.msgs , unRead: action.payload.msgs.filter(v=>!v.read && v.to ===action.payload.userid).length}
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {...state ,chatMsg:[...state.chatMsg, action.payload] ,unRead: state.unRead+n}
    case MSG_READ:
      const { from } = action.payload
      return {...state, chatMsg: state.chatMsg.map(v=>({...v, read: from===v.form ? true :v.read})),unRead: state.unRead - action.payload.num}
  
    default:
    return state
  }    
}

function msgLsit(msgs,users ,userid){
  return {type:MSG_LIST ,payload: {msgs ,users ,userid} }
}
 
function msgRecv(msgs ,userid){
  return {type: MSG_RECV, payload: msgs ,userid}
}

function msgRead({from ,to, num}){
  return {type: MSG_READ ,payload:{from ,to, num}}
}
export function readMsg(from){
  return (dispatch,getState)=>{
    Axios.post('/user/readmsg',{from})
    .then(res=>{
      const userid = getState().user._id;
      if(res.status === 200 && res.data.code === 0){
        dispatch(msgRead({userid , from, num: res.data.num}))
      } 
    })
  }
}

export function recvMsg(){
  return (dispatch ,getState)=>{
    socket.on('recvmsg',function(data){
      const userid = getState().user._id;
      console.log('recvmsg',data)
      dispatch(msgRecv(data ,userid))
    })
  }
}

export function sendMsg({from, to, msg}){
  return dispatch=>{
    socket.emit('sendmsg',{from, to, msg})
  }
}

export function getMsgList(){
  return (dispatch, getState)=>{
    Axios.get('/user/getmsglist')
    .then(res=>{
      if(res.status === 200 && res.data.code === 0){
        const userid = getState().user._id;
        dispatch(msgLsit(res.data.msgs,res.data.users ,userid))
      }
    })
  }
}