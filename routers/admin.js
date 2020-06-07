const router = require('koa-router')()

const user = require('./admin/user')
const goods = require('./admin/Goods')

router.use('/user', user)
router.use('/good', goods)

module.exports = router.routes()
