const router = require('koa-router')()
const db = require('../../mysql/index').isconnect()

router.get('/lists', async ctx => {
  ctx.body = await db.find('*', 'orderlist')
})

router.post('/change', async ctx => {
  let { id, address, phone, person } = ctx.request.body.params
  ctx.body = await db.update(
    'orderlist',
    `address='${address}',person='${person}',phone = '${phone}'`,
    `id='${id}'`
  )
})

module.exports = router.routes()
