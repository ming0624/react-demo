import Axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState = {
  userlist: []
}

export function chatUser(state=initState, action){
  switch (action.type) {
    case USER_LIST:
      return {...state, userlist: action.payload}
    default:
      return state
  }
}

function userList(data){
  return {type: USER_LIST, payload:data}
}

export function getUserList(type){
  return dispatch=>{
    Axios.get('/user/list?type='+ type)
    .then(res => {
      if(res.data.code === 0){
        dispatch(userList(res.data.data))
      }
    })
  }
}