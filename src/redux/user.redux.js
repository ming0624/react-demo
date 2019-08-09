
import Axios from "axios";
import { getRedirectPath } from '../util.js'
//注册信息
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
//登陆信息
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
//错误信息
const ERROR_MSG = 'ERROR_MSG'

const LOAD_DATA = 'LOAD_DATA'

const LOGOUT = 'LOGOUT'

const AUTH_SUCCESS = 'AUTH_SUCCESS'//验证信息

//初始状态
const initState = {
  redirectTo: '',//默认跳转路径
  // isAuth: false,
  msg: '',
  user: '',
  type: ''
}

export function user(state=initState,action){
  switch(action.type){
    // case REGISTER_SUCCESS:
    //   return {...state,msg:'',redirectTo: getRedirectPath(action.paylaod),isAuth:true,...action.paylaod}
    // case LOGIN_SUCCESS:
    //   return {...state,msg:'',redirectTo: getRedirectPath(action.paylaod),isAuth:true,...action.paylaod}
    case AUTH_SUCCESS:
      return {...state,msg:'',redirectTo: getRedirectPath(action.paylaod),...action.paylaod}
    case LOAD_DATA:
      return {...state, ...action.paylaod}
    case ERROR_MSG:
      return {...state, msg:action.msg, isAuth:false}
    case LOGOUT:
    return {...initState, redirectTo: '/login'}
    default:
    return state
  }
}

// function registerSuccess(data){
//   return {type:REGISTER_SUCCESS, paylaod:data }
// }

// function loginSuccess(data){
//   return {type: LOGIN_SUCCESS, paylaod: data}
// }
export function logoutSubmit(){
  return {type: LOGOUT }
}

function authSuccess(obj){
  const {pwd,...data} = obj;
  return {type: AUTH_SUCCESS, paylaod: data}
}

function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}

export function loadData(userinfo){
 return {type: LOAD_DATA, paylaod: userinfo}
}

//登陆
export function login({user,pwd}){
  if(!user || !pwd){
    return errorMsg('用户名或者密码必须输入')
  }
  return dispath=>{
    Axios.post('/user/login',{user,pwd})
    .then(res=>{
      if(res.status === 200 && res.data.code === 0){
        console.log("2222",res)
        dispath(authSuccess(res.data.data))
      }else{
        console.log("1111",res)
        dispath(errorMsg(res.data.msg))
      }
    })
  }
}

export function register({user,pwd,repeatpwd,type}){
  if(!user || !pwd || !type){
    return errorMsg('用户名或者密码不能为空')
  }
  if(pwd !== repeatpwd){
    return errorMsg('密码和确认密码不一致')
  }

  return dispath=>{
    Axios.post('/user/register',{user,pwd,type})
    .then(res=>{
      if(res.status === 200 && res.data.code === 0){
        console.log("2222",res)
        dispath(authSuccess({user,pwd,type}))
      }else{
        console.log("1111",res)
        dispath(errorMsg(res.data.msg))
      }
    })
  }
}

//完善信息
export function update(data){
  return dispath => {
    Axios.post('/user/update',data)
    .then(res => {
      if(res.status === 200 && res.data.code === 0){
        console.log("2222",res)
        dispath(authSuccess(res.data.data))
      }else{
        console.log("1111",res)
        dispath(errorMsg(res.data.msg))
      }
    })
  }
}