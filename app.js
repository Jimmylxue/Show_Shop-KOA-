const koa = require('koa')
const router = require('koa-router')()
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')

const client = require('./routers/client.js')
const admin = require('./routers/admin.js')
const Ui = require('./routers/UI/index')
const plugin = require('./routers/img_plugin')
const chat = require('./routers/chat/index')
const video = require('./routers/video')
const { myToken } = require('./routers/client/user') //共享token信息
const koajwt = require('koa-jwt') // 反向验证token插件

const app = new koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

app.use(static(__dirname + '/static'))

let backstaGE = '' // 后台的id
let userList = [] //前台客户端的对象数组  前台用户可以很多  后台只有一个  所以前台是数组 存放的最关键的就是clientid 和辨别clientid的唯一标识
io.on('connection', socket => {
  let id = socket.client.id
  socket.emit('ids', id)
  socket.on('beforestage', data => {
    console.log('idddd', data)
    let i = 0
    userList.forEach(item => {
      if (item.userid === data.userid) {
        i++
        item.id = data.id
      }
    })
    if (i === 0) {
      console.log('comming', data)
      userList.push(data)
    }
  })

  // 后台给前台
  socket.on('tousers', data => {
    console.log('bb', data)
    // console.log('后台发送的内容：', data)
    console.log('xxx', userList)
    let objOp = userList.filter(item => item.userid == data.userid)
    if (objOp.length > 0) {
      let id = objOp[0].id
      io.to(id).emit('touser', data)
      console.log('objId', id)
    } else {
      // 该用户还没有进浏览器
      io.emit('toback', { error: '用户还没有上线' })
    }
  })

  // 前台给后台
  socket.on('tobacks', data => {
    io.emit('toback', data)
  })
})

// app.use(
//   koajwt({
//     secret: myToken.secret,
//   }).unless({
//     path: [/\/register/, /\/login/],
//   })
// )

app.use(bodyparser())

// router.use('/checkState', checkState)
router.use('/client', client)
router.use('/admin', admin)
router.use('/img_plugin', plugin)
router.use('/ui', Ui)
router.use('/chat', chat)
router.use('/video', video)

app.use(router.routes())

server.listen(666, () => {
  console.log('Server is running on port 666')
})
