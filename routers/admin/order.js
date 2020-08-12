const router = require('koa-router')()
const db = require('../../mysql/index').isconnect()

router.get('/lists', async ctx => {
  ctx.body = await db.find('*', 'orders')
})

router.post('/change', async ctx => {
  let { id, address, phone, person } = ctx.request.body.params
  ctx.body = await db.update(
    'orderlist',
    `address='${address}',person='${person}',phone = '${phone}'`,
    `id='${id}'`
  )
})

router.post('/getSomeGood', async ctx => {
  let { ids } = ctx.request.body
  console.log('one', ids)
  ids = JSON.parse(ids)
  let options = getOrOption(ids)
  console.log('999', options)
  // try {
  ctx.body = await db.find('*', 'goodmsg', options)
  // } catch {
  //   ctx.body = { code: 201, message: '请求成功后台' }
  // }
})

function getOrOption(obj) {
  let option = ''
  obj.forEach(item => {
    // console.log(ids.indexOf(item), ids.length - 1)
    if (obj.indexOf(item) === obj.length - 1) {
      option += `goodid = ${item}`
      return
    }
    option += `goodid = ${item} or `
  })
  return option
}

module.exports = router.routes()
