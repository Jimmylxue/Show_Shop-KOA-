const router = require('koa-router')()
const dbs = require('../../mysql/index').isconnect()

router.get('/Btns', async ctx => {
  ctx.body = await dbs.find('*', 'navbtns')
})

router.post('/del', async ctx => {
  let { id } = ctx.request.body
  let res = await dbs.delete('navbtns', `btnid=${id}`)
  if (res.code == 1) {
    ctx.body = { code: 200, message: '您已删除了这个快捷方式' }
    return
  }
  ctx.body = { code: 10000, message: '出错了，删除失败~' }
})

router.post('/add', async ctx => {
  // console.log('comming')
  let { name, url } = ctx.request.body
  console.log(name, url)
  let res = await dbs.insert('navbtns', `('${name}','${url}')`, 'backstage')
  if (res.code == 1) {
    ctx.body = { code: 200, message: '添加成功' }
    return
  }
  ctx.body = { code: 10000, message: '出错了，添加失败~' }
})

module.exports = router.routes()
