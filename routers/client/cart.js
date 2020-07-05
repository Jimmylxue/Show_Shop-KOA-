const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/', async ctx => {
  ctx.body = 'hello'
})
router.post('/addCart', async ctx => {
  let {
    userId,
    goodId,
    goodName,
    goodDesc,
    buyCount,
    goodPrice,
    goodFreight,
    goodimg,
  } = ctx.request.body
  // console.log(typeof userId)
  let res = await dbs.insert(
    'cart',
    `(${userId}, ${goodId}, '${goodName}', '${goodDesc}', ${buyCount}, ${goodPrice}, ${goodFreight},'${goodimg}')`
  )
  if (res.code === 1) {
    ctx.body = { code: 200, message: '操作成功' }
  }
})

router.post('/cartList', async ctx => {
  let { id } = ctx.request.body
  ctx.body = await dbs.find('*', 'cart', `userid=${id}`)
})

router.post('/deleteOne', async ctx => {
  let { id } = ctx.request.body
  let res = await dbs.delete('cart', `cartid = ${id}`)
  // console.log(res)
  if (res.code === 1) {
    ctx.body = { code: 200, message: '操作成功' }
  }
  // ctx.body = { code: 200, message: '请求成功' }
})

module.exports = router.routes()
