const router = require('koa-router')()

const dbs = require('../../mysql/index').isconnect()

router.post('/getOrder', async ctx => {
  let { userid } = ctx.request.body
  ctx.body = await dbs.find('*', 'orders', `userid = ${userid}`)
})

router.post('/addOrder', async ctx => {
  let {
    userid,
    buyname,
    goodcount,
    payWay,
    createtime,
    payState,
    orderprice,
    goodid,
  } = ctx.request.body.obj
  let { phone, username, province, city, area, detail } = ctx.request.body.area
  let res = await dbs.insert(
    'orders',
    `(${userid},'${buyname}','${username}',${orderprice},'${phone}','${goodid}',${goodcount},'${province}','${city}','${area}','${detail}','${createtime}',${payState},${payWay})`
  )
  if (res.code === 1) {
    ctx.body = { code: 200, message: '请求成功' }
  } else {
    ctx.code = { code: 202, message: '请求成功' }
  }
})

module.exports = router.routes()
