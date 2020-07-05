const router = require('koa-router')()
const fs = require('fs')

const db = require('../../mysql/index')
const { resolve } = require('path')

let dbs = db.isconnect()

// 查询商品
router.get('/goods', async ctx => {
  ctx.body = await dbs.find('*', 'goodmsg')
})

router.post('/getOneGood', async ctx => {
  let { goodid } = ctx.request.body
  ctx.body = await dbs.find('*', 'goodmsg', `goodid = ${goodid}`)
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
    img,
    imgs,
  } = ctx.request.body
  // 文件后缀名
  img = img[0]
  imgs = imgs.join('@')
  console.log('xx', img)
  console.log(img, imgs)
  let res = await dbs.insert(
    'goodmsg',
    `('${name}','${desc}','${img}','${imgs}','${freight}','${type}','${capacity}','${classify}','${brand}','${price}')`,
    'backstage'
  )
  if (res.code === 1) {
    ctx.body = { code: 200, message: '商品添加成功' }
    return
  }
  ctx.body = { code: 0, message: '商品添加失败' }
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
// 修改库存
router.post('/editCount', async ctx => {
  let id = ctx.request.body.id
  let count = ctx.request.body.count
  let res = await dbs.update('goodmsg', `count = ${count}`, `goodid = ${id}`)
  if (res.code === 1) {
    ctx.body = res
    return
  }
  ctx.body = { code: 0, message: '清空失败' }
})

router.post('/changetag', async ctx => {
  let { id, tag, nowPrice, price } = ctx.request.body
  console.log(id, tag, nowPrice, price)
  ctx.body = await new Promise((reslove, reject) => {
    if (tag === 'discount') {
      dbs
        .update(
          'goodmsg',
          `tag = '${tag}',nowPrice = '${nowPrice}'`,
          `goodid = '${id}'`
        )
        .then(res => {
          reslove(res)
        })
      return
    }
    dbs
      .update(
        'goodmsg',
        `tag = '${tag}',nowPrice = '${price}'`,
        `goodid='${id}'`
      )
      .then(res => {
        reslove(res)
      })
  })
})

// 删除商品
router.post('/delGood', async ctx => {
  let { goodid } = ctx.request.body
  let res = await dbs.delete('goodmsg', `goodid=${goodid}`)
  if (res.code === 1) {
    ctx.body = { code: 200, message: '请求成功' }
    return
  }
  ctx.body = { code: 201, message: '删除失败' }
})

// 修改商品数据
router.post('/editGood', async ctx => {
  let {
    goodid,
    name,
    desc,
    price,
    classify,
    brand,
    capacity,
    type,
    freight,
    img,
    imgs,
  } = ctx.request.body
  img = img[0]
  imgs = imgs.join('@')
  let res = await dbs.update(
    'goodmsg',
    `goodname='${name}',gooddesc='${desc}',goodimg='${img}',freight=${freight},type='${type}',capacity='${capacity}',classify='${classify}',brand='${brand}',price=${price},imgs='${imgs}'`,
    `goodid=${goodid}`
  )
  if (res.code === 1) {
    ctx.body = { code: 200, message: '操作成功' }
    return
  }
  ctx.body = { code: 0, message: '更新失败' }
})

// 写文件方法
function writeFile(imgname, imgsrc, name) {
  let promise_write = new Promise((resolve, reject) => {
    let str = ''
    let extend = '.' + imgname.split(';')[0].split('/')[1]
    let img = Buffer.from(imgsrc, 'base64')
    let imgpostiton = `/goodimgs/${name}${Date.now()}${extend}`
    let imgfile = __dirname + `../../../static${imgpostiton}`
    fs.writeFile(imgfile, img, err => {
      if (err) {
        reject('error')
        return
      }
      str = `http://127.0.0.1:666${imgpostiton}`
      resolve(str)
    })
  })
  return promise_write
}

module.exports = router.routes()
