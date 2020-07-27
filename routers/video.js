const router = require('koa-router')()

router.post('/list', async ctx => {
  ctx.body = { code: 200, result: '请求成功' }
})

module.exports = router.routes()
