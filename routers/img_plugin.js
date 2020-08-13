const router = require('koa-router')()
const fs = require('fs')
const { resolve } = require('path')

router.get('/getDir', async ctx => {
  let objPath = resolve(__dirname, '../static')
  let dir = fs.readdirSync(objPath)
  ctx.body = { code: 200, message: '请求成功', result: dir }
})

router.post('/getImgs', async ctx => {
  let imgComponents = []
  let objPath = resolve(__dirname, '../static')
  fs.readdirSync(objPath).map(item => {
    let json = {}
    json.name = item
    let newPath = resolve(objPath, item)
    let anser = fs.readdirSync(newPath)
    json.url = anser
    imgComponents.push(json)
  })
  // map和forEach的区别 都是遍历数组元素  map会直接影响本身
  imgComponents.map(item => {
    item.url.map(function (items) {
      this.items = 'http://127.0.0.1:666/' + items
    })
  })
  ctx.body = {
    code: 200,
    message: '请求成功',
    result: imgComponents,
  }
})

router.post('/uploadImgs', async ctx => {
  let { filename, files } = ctx.request.body
  // console.log(filename, files)
  // try {
  files.map(item => {
    let extend = '.' + item.imgname.split(';')[0].split('/')[1]
    let img = Buffer.from(item.imgsrc, 'base64')
    let imgname = `${Date.now()}${extend}`
    let imgpostiton = resolve(__dirname, `../static/${filename}/${imgname}`)
    fs.writeFileSync(imgpostiton, img)
  })
  // } catch {
  //   ctx.body = { code: 0, message: '添加失败' }
  // }
  ctx.body = { code: 200, message: '请求成功' }
})

router.post('/delImg', async ctx => {
  let { dir, filename } = ctx.request.body
  // console.log(dir, filename)
  let objdir = resolve(__dirname, `../static/${dir}/${filename}`)
  // console.log(objdir)
  // try {
  fs.unlinkSync(objdir)
  // } catch {
  //   ctx.body = { code: 0, message: '删除失败' }
  // }
  ctx.body = { code: 200, message: '操作成功' }
})

module.exports = router.routes()
