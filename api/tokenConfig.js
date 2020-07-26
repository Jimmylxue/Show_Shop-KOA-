const jwyAuth = require('koa-jwt')
const jwt = require('jsonwebtoken')
// const secret = 'Show_shop'

// Math.floor(Date.now() / 1000) + 60 * 60
// let TokenOperation = {
//   secret: 'Show_shop',
//   signToken(key1, time) {
//     return jwt.sign(
//       {
//         data: { name: key1 },
//         // 过期时间
//         exp: time,
//       },
//       secret
//     )
//   },
// }

class TokenOperation {
  constructor(secret) {
    this.secret = secret
    this.Token = null
    this.jwyAuth = jwyAuth
  }
  signToken(key, time) {
    this.Token = jwt.sign(
      {
        data: { name: key },
        exp: time,
      },
      this.secret
    )
    return this.Token
  }
  checkState() {
    return this.jwyAuth
  }
}

// let mytoken = new TokenOperation('Jimmy')
// let token = mytoken.signToken('Jimmy', Math.floor(Date.now() / 1000) + 60 * 60)
// console.log(token)

module.exports = TokenOperation
// const router = require('koa-router')()

// module.exports = router.routes()
