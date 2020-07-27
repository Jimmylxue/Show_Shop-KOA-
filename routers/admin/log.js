const router = require('koa-router')()
const tokenConfig = require('../../api/tokenConfig')
const dbs = require('../../mysql/index').isconnect()

let myToken = new tokenConfig(`Jimmys's Show_shop`)

router.post('/login', async ctx => {
  let { userName, passWord } = ctx.request.body
  let res = await dbs.find('*', 'admin', `username = '${userName}'`)
  if (res.length == 0 || res[0].password != passWord) {
    ctx.body = { code: 10000, message: '登录失败' }
  } else {
    const token = myToken.signToken(
      userName,
      Math.floor(Date.now() / 1000) + 60 * 60
    )
    ctx.body = { code: 200, token, result: { data: res[0] } }
  }
})

module.exports = router.routes()
