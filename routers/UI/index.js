const router = require('koa-router')()
const slider = require('./slider')
const navBtns = require('./navBtns')
const functions = require('./functionMode')
const loginBg = require('./loginBg')
const hover_list = require('./hover_list')

router.use('/slider', slider)
router.use('/navBtns', navBtns)
router.use('/function', functions)
router.use('/loginBg', loginBg)
router.use('/hover_list', hover_list)

module.exports = router.routes()
