const router = require('koa-router')()

const db = require('../../mysql/index')

let dbs = db.isconnect()

router.get('/', async (ctx) => {
  ctx.body = await dbs.find('*', 'goodmsg')
  // ctx.body = 'hello goods'
})

module.exports = router.routes()
