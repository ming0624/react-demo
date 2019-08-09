const express = require('express')
const Router = express.Router()
const utility = require('utility')
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd': 0, '__v': 0}
// Chat.remove({},function(e,d){})
Router.get('/list',function(req, res){
  // 清除用户列表
  // User.remove({},function(err, doc){})
  //获取用户列表
  const {type} = req.query;
  User.find({type},function(err,doc){
    return res.json({code: 0, data: doc})
  })
})

Router.get('/getmsglist',function(req ,res){
  const user = req.cookies.userId;
  // '$or':[{from:user, to:user}]
  User.find({},function(err, userdoc){
    let users ={};
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]},function(err ,doc){
      if(!err){
        return res.json({code: 0, msgs: doc ,users:users})
      }
    })
  })
})

Router.post('/readmsg', function(req ,res){
  const userid = req.cookies.userId;
  const { from } = req.body;
  Chat.update({from, to:userid}, {"$set":{read:true}},{'multi':true}, function(err ,doc){
    if(!err){
      console.log(doc)
      return res.json({code: 0, num: doc.nModified})
    }
    return res.json({code: 1, msg:'修改失败'})
  }) 
})


Router.post('/update',function(req, res){
  const userId = req.cookies.userId;
  if(!userId){
    return res,json({code: 1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userId,body,function(err, doc){
    const data = Object.assign({},{
      user: doc.user,
      type: doc.type
    },body)
    return res.json({code: 0,data})
  })
})

Router.post('/login',function(req, res){
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5(pwd)},_filter,function(err, doc){
    if(!doc){ 
      return res.json({code: 1, msg:'用户名不错在或密码错误'})
    }
    res.cookie('userId',doc._id);
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register',function(req, res){
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code: 1,msg:'用户名已存在'})
    }

    const userModel = new User({user, type, pwd:md5(pwd)})
    userModel.save(function(e, d){
      if(e){
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d;
      res.cookie('userId',_id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})
Router.get('/info',function(req,res){
  const {userId} = req.cookies;
  if(!userId){
    // 用户有没有cookie
    return res.json({code: 1})
  }
  User.findOne({_id:userId},_filter,function(err, doc){
    if(err){
      return res.json({code: 1,msg:'服务端出错了'})
    }
    if(doc){
      return res.json({code: 0, data: doc})
    }
  })
  
})

//密码加盐
function md5(pwd){
  const salt = 'baoabo_xinli_k!00@~~'
  return utility.md5(utility.md5(pwd+salt))
}
module.exports = Router