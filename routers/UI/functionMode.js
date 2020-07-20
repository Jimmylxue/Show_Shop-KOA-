const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/mode', async ctx => {
  ctx.body = await dbs.find('*', 'functionmode')
})

router.post('/edit', async ctx => {
  let { ids } = ctx.request.body
  let option = ''
  let arr = ids.split('@')
  arr.map((item, index) => {
    if (index == arr.length - 1) {
      option += `id = ${item}`
      return
    }
    option += `id = ${item} or `
  })
  await dbs.other('update functionmode set status = 0')
  let res = await dbs.update('functionmode', `status = 1`, option)
  if (res.code === 1) {
    ctx.body = { code: 200, result: '更新成功' }
    return
  }
  ctx.body = { code: 10000, result: '更新失败' }
})

router.post('/add', async ctx => {
  let { functionName, img, url } = ctx.request.body
  let res = await dbs.insert(
    'functionmode',
    `('${functionName}','${img}','${url}')`,
    'backstage'
  )
  if (res.code === 1) {
    ctx.body = { code: 200, result: '添加成功' }
    return
  }
  ctx.body = { code: 10000, result: '添加失败' }
})

router.post('/del', async ctx => {
  let { id } = ctx.request.body
  let res = await dbs.delete('functionmode', `id = ${id}`)
  if (res.code == 1) {
    ctx.body = { code: 200, result: '删除成功~' }
    return
  }
  ctx.body = { code: 10000, result: '删除失败~' }
})

module.exports = router.routes()
