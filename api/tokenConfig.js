const jwyAuth = require('koa-jwt') // 反向验证token
const jwt = require('jsonwebtoken') //设置token

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

module.exports = TokenOperation
