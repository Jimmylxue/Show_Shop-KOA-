const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/all', async ctx => {
  let res1 = await dbs.find('*', 'user')
  let res2 = await dbs.find('*', 'orders')
  let today = new Date().getTime()
  let user = {}
  let order = {}
  let vip = {}
  let price = {}

  getdata(res1, user, 'createtime', today)
  getdata(res2, order, 'createtime', today)
  getdata(res1, vip, 'updatetime', today, 'role', 'vip')
  getprice(res2, price, 'orderprice', today)
  ctx.body = {
    code: 200,
    result: '请求成功',
    message: { user, order, vip, price },
  }
})

module.exports = router.routes()

function getdata(dataSet, obj, attr, today, option, opt) {
  if (arguments.length != 4) {
    dataSet = dataSet.filter(item => {
      return item[option] == opt
    })
    console.log(dataSet)
  }
  obj.allCount = dataSet.length
  console.log(77, obj.allCount)
  obj.todayCount = dataSet.filter(item => {
    return (today - item[attr]) / (24 * 60 * 60 * 1000) < 1
  }).length
  obj.yestodayCount = dataSet.filter(item => {
    return (
      (today - item[attr]) / (24 * 60 * 60 * 1000) > 1 &&
      (today - item[attr]) / (24 * 60 * 60 * 1000) < 2
    )
  }).length
}

function getprice(dataSet, obj, attr, today) {
  obj.allCount = dataSet.reduce((start, item) => {
    return (start += item[attr])
  }, 0)

  obj.todayCount = dataSet
    .filter(item => {
      return (today - item.createtime) / (24 * 60 * 60 * 1000) < 1
    })
    .reduce((start, it) => {
      return (start += it[attr])
    }, 0)

  obj.yestodayCount = dataSet
    .filter(item => {
      return (
        (today - item.createtime) / (24 * 60 * 60 * 1000) > 1 &&
        (today - item.createtime) / (24 * 60 * 60 * 1000) < 2
      )
    })
    .reduce((start, it) => {
      return (start += it[attr])
    }, 0)
}
