const router = require('koa-router')()
const slider = require('./slider')
const navBtns = require('./navBtns')
const functions = require('./functionMode')
const loginBg = require('./loginBg')

router.use('/slider', slider)
router.use('/navBtns', navBtns)
router.use('/function', functions)
router.use('/loginBg', loginBg)

module.exports = router.routes()
