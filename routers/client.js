const router = require('koa-router')()

const user = require('./client/user')
const good = require('./client/goods')

router.use('/user', user)
router.use('/good', good)

module.exports = router.routes()
