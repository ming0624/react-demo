const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user.js')
const model = require('./model.js')
const Chat = model.getModel('chat')

// 创建app
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  console.log('开始建立链接')
  socket.on('sendmsg',function(data){
    console.log(data)
    const {from, to, msg} = data;
    const chatId = [from, to].sort().join('_')
    Chat.create({chatId ,from ,to ,content: msg},function(err ,doc){
      console.log("docdocdoc",doc)
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
    
  })
  
})



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)//开启中间件

// mongoose.connection.on('connected',function(){
//   console.log('mongo connect success')
// })

// 类似于MySQL表，mongo里有文档，字段概念
// const User = mongoose.model('user',new mongoose.Schema({
//   user:{type:String,require:true},
//   age:{type:Number,require:true}
// }));

// create 新增数据
// User.create({
//   user:'xiaoming',
//   age:28
// },function(err,doc){
//   if(!err){
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({age:20},function(err,doc){
//   console.log(doc)
// })

// 更新数据
// User.update({'user':'xiaoming'},{'$set':{age:33}},function(err,doc){
//   console.log(doc)
// })

// app.get('/',function(req,res){
//   res.send('<h1>hello world!</h1>')
// })
// app.get('/data',function(req,res){
//   User.findOne({'user':'xiaoming'},function(err,doc){
//     res.json(doc)
//   })
  // res.json({
  //   name:'chenmingbao',
  //   work:'IT',
  //   age:27,
  //   height:187,
  //   sex:'men'
  // })
  server.listen(9093,function(){
  console.log('node app at port 9093')
})