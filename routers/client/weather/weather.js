const router = require('koa-router')()
const queryString = require('querystring')
const request = require('request')

router.post('/getCityWeather', async ctx => {
  let { city } = ctx.request.body
  console.log('comming')
  let queryData = queryString.stringify({
    city: city, // 接受短信的用户手机号码
    key: '9d83e432ce432cb1311e2e8e303c3c5d', // 应用APPKEY(应用详细页查询)
  })
  let queryUrl = 'http://apis.juhe.cn/simpleWeather/query?' + queryData
  ctx.body = await new Promise((resolve, reject) => {
    request(queryUrl, function (error, response, body) {
      // console.log(error)
      // console.log(body)
      if (error === null) {
        // console.log(body) // 打印接口返回内容

        var jsonObj = JSON.parse(body) // 解析接口返回的JSON内容
        // console.log(jsonObj)
        // res.end(body)
        console.log(body)
        resolve({ code: 200, result: body })
        // res.end(jsonObj)
      } else {
        reject({ code: 100000, result: '请检查地名' })
      }
    })
  })
})

module.exports = router.routes()
