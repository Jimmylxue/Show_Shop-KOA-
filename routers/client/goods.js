const router = require('koa-router')()

const db = require('../../mysql/index')

let dbs = db.isconnect()

router.get('/', async ctx => {
  ctx.body = await dbs.find('*', 'goodmsg')
  // ctx.body = 'hello goods'
})

router.get('/allgood', async ctx => {
  let id = ctx.query.id
  console.log(id)
  if (id == 'all') {
    console.log('hello')
    ctx.body = await dbs.find('*', 'goodmsg')
    return
  }
  ctx.body = await dbs.find('*', 'goodmsg', `goodid = '${id}'`)

  // ctx.body = 'hello goods'
})

module.exports = router.routes()
