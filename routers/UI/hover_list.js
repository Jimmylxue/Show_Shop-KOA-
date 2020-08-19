const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/list', async ctx => {
  let res = await dbs.find(
    '*',
    'goodmsg',
    "classify = '电脑' or classify = '电视' or classify = '手机' or classify = '手表' or classify = '耳机' order by classify;"
  )
  ctx.body = res
})

module.exports = router.routes()
