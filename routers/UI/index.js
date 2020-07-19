const router = require('koa-router')()
const slider = require('./slider')
const navBtns = require('./navBtns')
const functions = require('./functionMode')

router.use('/slider', slider)
router.use('/navBtns', navBtns)
router.use('/function', functions)

module.exports = router.routes()
