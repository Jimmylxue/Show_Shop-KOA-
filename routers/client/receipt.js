const router = require('koa-router')()

const dbs = require('../../mysql/index').isconnect()

router.post('/getReceipt', async ctx => {
  let id = ctx.request.body.id
  let res = await dbs.find('*', 'receipt', `userid=${id}`)
  ctx.body = res
})

router.post('/addReceipt', async ctx => {
  let {
    userid,
    username,
    phone,
    province,
    city,
    districtAndCounty,
    detail,
    flag,
  } = ctx.request.body
  let res = await dbs.insert(
    'receipt',
    `(${userid},'${username}','${phone}','${province}','${city}','${districtAndCounty}','${detail}','${flag}')`
  )
  if (res.code === 1) {
    ctx.body = { code: 200, message: '添加成功' }
    return
  }
  ctx.body = { code: 201, message: '添加失败' }
})

module.exports = router.routes()
