const router = require('koa-router')()

const db = require('../../mysql/index')

let dbs = db.isconnect()

router.get('/goods', async (ctx) => {
  ctx.body = await dbs.find('*', 'goodmsg')
})

module.exports = router.routes()
