const router = require('koa-router')()
const captcha = require('trek-captcha')
const fs = require('fs')
const tokenConfig = require('../../api/tokenConfig')

const db = require('../../mysql/index')
let dbs = db.isconnect()
let myToken = new tokenConfig(`Jimmy's Show_shop`)

// const user = [{ userid: '12345678', userpsd: '123456789', username: 'Jimmy' }]
const session = {}

router.get('/login', async ctx => {
  console.log('give you')
  const { token, buffer } = await captcha({ size: 4 })
  session.number = token
  ctx.body = buffer
})

// 登录
router.post('/login', async ctx => {
  let { form, code } = ctx.request.body
  if (code !== session.number) {
    ctx.body = { code: 2, message: '验证码错误' }
    return
  }

  // console.log(form)
  let res = await dbs.find('*', 'user', `userid=${form.userid}`)
  // console.log('ress1', form.userpsd)
  if (res.length === 0) {
    ctx.body = { code: 0, message: '请出入正确的账号' }
  }
  // try {
  if (res[0].userpsd === form.userpsd) {
    // const token = jwt.sign(
    //   {
    //     data: { name: form.userid },
    //     // 过期时间
    //     exp: Math.floor(Date.now() / 1000) + 60 * 60,
    //   },
    //   secret
    // )
    const token = myToken.signToken(
      form.userid,
      Math.floor(Date.now() / 1000) + 60 * 60
    )
    console.log(res[0])
    ctx.body = {
      code: 1,
      userName: res[0].uname,
      msg: res[0],
      token: token,
    }
    return
    // ctx.status = 401
  }
  ctx.body = { code: 0, message: '用户名或者密码错误' }
  // } catch {
  //   ctx.body = { code: 0, message: '用户名或者密码错误' }
  // }

  // ctx.body = 'Hello Koa'
})

// 注册
router.post('/register', async ctx => {
  let { header, headername, userphone, userpsd, uname } = ctx.request.body
  let extent = '.' + headername.split(';')[0].split('/')[1]
  let img = Buffer.from(header, 'base64')
  let imgrul = `/header/${userphone}+${Date.now()}${extent}`
  let headers = __dirname + `../../../static${imgrul}`
  let enter = `http://127.0.0.1:666${imgrul}`

  ctx.body = await new Promise((reslove, reject) => {
    fs.writeFile(headers, img, err => {
      if (err) {
        reject({ code: 0, message: '照片写入失败' })
      }
      dbs
        .insert(
          'user',
          `('${userphone}','${userpsd}','${uname}','${enter}')`,
          'before'
        )
        .then(res => {
          if (res.code === 1) {
            dbs.find('userid', 'user', `userphone=${userphone}`).then(res => {
              reslove({
                code: 1,
                message: '注册成功',
                registerid: res[0].userid,
              })
            })
          }
        })
        .catch(err => {
          reject({ code: 0, message: '注册失败' })
        })
    })
  })
})

router.post('/getUser', async ctx => {
  let id = ctx.request.body.id
  // console.log(ctx.request.body)
  ctx.body = { code: 200, message: 'hello' }
  // console.log(id)
  ctx.body = await dbs.find('*', 'user', `userid = ${id}`)
})

module.exports = { user: router.routes(), myToken }
