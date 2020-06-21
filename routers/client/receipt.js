const router = require('koa-router')()

const dbs = require('../../mysql/index').isconnect()

router.post('/getReceipt', async ctx => {
  let id = ctx.request.body.id
  let res = await dbs.find('*', 'receipt', `userid=${id}`)
  ctx.body = res
})

module.exports = router.routes()
