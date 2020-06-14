const router = require('koa-router')()

const user = require('./admin/user')
const goods = require('./admin/Goods')
const order = require('./admin/order')

router.use('/user', user)
router.use('/good', goods)
router.use('/order', order)

module.exports = router.routes()
