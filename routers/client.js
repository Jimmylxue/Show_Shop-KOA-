const router = require('koa-router')()

const { user } = require('./client/user')
const good = require('./client/goods')
const cart = require('./client/cart')
const receipt = require('./client/receipt')
const order = require('./client/order')
const weather = require('./client/weather/weather')

router.use('/user', user)
router.use('/good', good)
router.use('/cart', cart)
router.use('/receipt', receipt)
router.use('/order', order)
router.use('/weather', weather)

module.exports = router.routes()
