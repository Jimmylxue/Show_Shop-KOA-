const router = require('koa-router')()

const db = require('../../mysql/index')

let dbs = db.isconnect()

router.get('/', async ctx => {
  ctx.body = await dbs.find('*', 'goodmsg')
  // ctx.body = 'hello goods'
})

router.get('/allgood', async ctx => {
  let id = ctx.query.id
  // console.log(id)
  if (id == 'all') {
    // console.log('hello')
    ctx.body = await dbs.find('*', 'goodmsg')
    return
  }
  ctx.body = await dbs.find('*', 'goodmsg', `goodid = '${id}'`)

  // ctx.body = 'hello goods'
})

router.post('/getSomeGood', async ctx => {
  let { ids } = ctx.request.body
  // console.log('one', ids)
  ids = JSON.parse(ids)
  let options = getOrOption(ids)

  try {
    ctx.body = await dbs.find('*', 'goodmsg', options)
  } catch {
    ctx.body = { code: 201, message: '请求成功后台' }
  }
  // console.log('two', JSON.parse(ids))
})

// obj只能是数组对象
function getOrOption(obj) {
  let option = ''
  obj.forEach(item => {
    // console.log(ids.indexOf(item), ids.length - 1)
    if (obj.indexOf(item) === obj.length - 1) {
      option += `goodid = ${item}`
      return
    }
    option += `goodid = ${item} or `
  })
  return option
}

module.exports = router.routes()
