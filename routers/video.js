const router = require('koa-router')()
const dbs = require('../mysql/index').isconnect()

router.post('/list', async ctx => {
  ctx.body = await dbs.find('*', 'video')
})

router.post('/add', async ctx => {
  let { title, img, url } = ctx.request.body
  let res = await dbs.insert(
    'video',
    `('${title}','${img}','${url}')`,
    'backstage'
  )
  if (res.code == 1) {
    ctx.body = { code: 200, result: '添加成功' }
    return
  }
  ctx.body = { code: 10000, result: '添加失败' }
})

router.post('/del', async ctx => {
  let { videoId } = ctx.request.body
  let res = await dbs.delete('video', `videoId = ${videoId}`)
  console.log('res', res)
  if (res.code == 1) {
    ctx.body = { code: 200, result: '删除成功' }
    return
  }
  ctx.body = { code: 10000, result: '删除失败' }
})

module.exports = router.routes()
