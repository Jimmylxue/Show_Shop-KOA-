const router = require('koa-router')()
const fs = require('fs')

const db = require('../../mysql/index')

let dbs = db.isconnect()

// 查询商品
router.get('/goods', async ctx => {
  ctx.body = await dbs.find('*', 'goodmsg')
})

// insert 插入商品
router.post('/add', async ctx => {
  let {
    name,
    desc,
    price,
    classify,
    brand,
    capacity,
    type,
    freight,
    imgname,
    imgsrc,
  } = ctx.request.body
  // 文件后缀名
  let extend = '.' + imgname.split(';')[0].split('/')[1]
  let img = Buffer.from(imgsrc, 'base64')
  let imgpostiton = `/goodimg/${name}${Date.now()}${extend}`
  let imgfile = __dirname + `../../../static${imgpostiton}`

  ctx.body = await new Promise((reslove, reject) => {
    fs.writeFile(imgfile, img, err => {
      if (err) {
        reject({ code: 0, message: '照片写入失败' })
      }
      dbs
        .insert(
          'goodmsg',
          `('${name}','${desc}','${imgfile}','${freight}','${type}','${capacity}','${classify}','${brand}','${price}')`,
          'backstage'
        )
        .then(res => {
          if (res.code === 1) {
            reslove({ code: 1, message: '商品添加成功' })
            return
          }
          reject({ code: 0, message: '未知原因失败' })
        })
    })
  })
})

// 查询库存
router.get('/count', async ctx => {
  ctx.body = await dbs.find(
    'goodid,goodname,goodimg,capacity,type,sale,count',
    'goodmsg'
  )
})
// 清空库存
router.post('/clearCount', async ctx => {
  let id = ctx.request.body.id
  let res = await dbs.update('goodmsg', `count = 0`, `goodid = ${id}`)
  if (res.code === 1) {
    ctx.body = res
    return
  }
  ctx.body = { code: 0, message: '清空失败' }
})
module.exports = router.routes()
