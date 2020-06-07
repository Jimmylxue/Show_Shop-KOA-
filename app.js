const koa = require('koa')
const router = require('koa-router')()
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')

const client = require('./routers/client.js')
const admin = require('./routers/admin.js')

const app = new koa()

app.use(static(__dirname + '/static'))

app.use(bodyparser())

router.use('/client', client)
router.use('/admin', admin)

app.use(router.routes())

app.listen(666, () => {
  console.log('Server is running on port 666')
})
