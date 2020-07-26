const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.post('/record', async ctx => {
  let { userid } = ctx.request.body
  let res1 = await dbs.find('userid', 'chat_record', `userid = ${userid}`)
  // ctx.body = { code: 200, message: 'ok' }
  let temp = res1.length == 0 ? false : true
  ctx.body = await new Promise((resolve, reject) => {
    if (res1.length == 0) {
      // 没有该用户
      dbs
        .other(`insert into chat_record(userid) values (${userid});`)
        .then(res => {
          console.log('444')
          if (res.code == 1) {
            resolve({ code: 200, result: { userid, data: [] } })
            // ctx.body =
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log(66666)
      dbs.find('msg', 'chat_record', `userid=${userid}`).then(res => {
        console.log('res', res)
        resolve({ code: 200, result: res })
      })
    }
  })
})

module.exports = router.routes()
