const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/loginBg', async ctx => {
  ctx.body = await dbs.find('*', 'background')
})

router.post('/nowLoginBg', async ctx => {
  ctx.body = await dbs.find('*', 'background', `status=1`)
})

router.post('/add', async ctx => {
  let { img } = ctx.request.body
  let res = await dbs.insert('background', `('${img}')`, 'backstage')
  if (res.code == 1) {
    ctx.body = { code: 200, result: '请求成功' }
    return
  }
  ctx.body = { code: 10000, result: '请求失败' }
})

router.post('/update', async ctx => {
  let { id } = ctx.request.body
  console.log(id)
  let res = await dbs.update('background', `status=0`, `id!=${id}`)
  if (res.code == 1) {
    await dbs.update('background', 'status=1', `id=${id}`).then(res => {
      if (res.code == 1) {
        ctx.body = { code: 200, result: '操作成功' }
      } else {
        ctx.body = { code: 10000, result: '请求失败' }
      }
    })
  }
})

router.post('/del', async ctx => {
  let { id } = ctx.request.body
  let res = await dbs.delete('background', `id=${id}`)
  if (res.code == 1) {
    ctx.body = { code: 200, result: '请求成功' }
    return
  }
  ctx.body = { code: 10000, result: '请求失败' }
})

module.exports = router.routes()
