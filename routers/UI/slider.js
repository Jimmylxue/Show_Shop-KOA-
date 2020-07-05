const router = require('koa-router')()

const dbs = require('../../mysql/index').isconnect()

router.get('/getSlider', async ctx => {
  ctx.body = await dbs.find('*', 'slider')
})

module.exports = router.routes()
