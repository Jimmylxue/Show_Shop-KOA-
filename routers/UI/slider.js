const router = require('koa-router')()

const dbs = require('../../mysql/index').isconnect()

router.get('/getSlider', async ctx => {
  ctx.body = await dbs.find('*', 'slider')
})

router.post('/delSlider', async ctx => {
  let { sliderid } = ctx.request.body
  let res = await dbs.delete('slider', `sliderid=${sliderid}`)
  if (res.code === 1) {
    ctx.body = { code: 200, message: '请求成功' }
    return
  }
  ctx.body = { code: 10000, message: '操作失败' }
})

router.post('/addSlider', async ctx => {
  let { imgs } = ctx.request.body
  let str = ''
  if (imgs.length > 1) {
    imgs.map(item => {
      str += `('${item}'),`
    })
    str = str.slice(0, str.length - 1)
  } else {
    str = `('${imgs[0]}')`
  }
  let res = await dbs.insert('slider', `${str}`, 'backstage')
  console.log(res)
  if (res.code === 1) {
    ctx.body = { code: 200, message: '请求成功' }
    return
  }
  ctx.body = { code: 10000, message: '出错了' }
})

module.exports = router.routes()
