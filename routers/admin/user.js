const router = require('koa-router')()

const db = require('../../mysql/index')
let dbs = db.isconnect()

// 获取用户信息
router.get('/getAll', async (ctx) => {
  ctx.body = await dbs.find('*', 'user')
})

// 删除用户
router.get('/deleteUser', async (ctx) => {
  let res = await dbs.delete('user', `userid = ${ctx.query.id}`)
  if (res.code === 1) {
    ctx.body = { code: 1, message: '删除成功' }
    return
  }
  ctx.body = { code: 0, message: '删除失败' }
})

// 更新用户
router.post('/update', async (ctx) => {
  let { userid, uname, role } = ctx.request.body
  let res = await dbs.update(
    'user',
    `uname = '${uname}',role = '${role}'`,
    `userid = ${userid}`
  )
  if (res.code === 1) {
    ctx.body = { code: 1, message: '更新成功' }
    return
  }
  ctx.body = { code: 0, message: '更新失败' }
})

// 添加用户
router.post('/addUser', async (ctx) => {
  console.log(ctx.request.body)
  let { phone, email, userPwd, userName } = ctx.request.body
  let res = await dbs.insert(
    'user',
    `('${phone}','${userPwd}','${userName}','${email}')`,
    'backstage'
  )
  if (res.code === 1) {
    ctx.body = { code: 1, message: '添加成功' }
    return
  }
  ctx.body = { code: 0, message: '添加失败' }
})

module.exports = router.routes()
