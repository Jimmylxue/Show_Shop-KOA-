const router = require('koa-router')()

const user = require('./admin/user')
const goods = require('./admin/Goods')
const order = require('./admin/order')
const log = require('./admin/log')

router.use('/log', log)
router.use('/user', user)
router.use('/good', goods)
router.use('/order', order)
router.use('/log', log)

module.exports = router.routes()
