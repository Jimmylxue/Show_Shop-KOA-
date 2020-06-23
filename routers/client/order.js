const router = require('koa-router')()

router.get('list', async ctx => {
  ctx.body = { code: 200, message: '请求成功' }
})

router.post('addOrder', async ctx => {})

module.exports = router.routes()
