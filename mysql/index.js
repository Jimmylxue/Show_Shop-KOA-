// mysql 方法库

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'show_shop',
})

class db {
  static isconnect() {
    if (!db.connection) {
      return (db.connection = new db())
    }
    return db.connection
  }
  constructor() {
    this.status = ''
  }

  connect() {
    return new Promise((reslove, reject) => {
      if (this.status === '') {
        this.status = connection.connect()
        reslove(this.status)
      }
      reslove(this.status)
    })
  }

  // 增
  insert(table, options, way = 'before') {
    // console.log('aaa')
    return new Promise((reslove, reject) => {
      this.connect()
      let sql = ''
      if (way === 'backstage') {
        if (table === 'user') {
          sql = `insert into ${table}(userphone,userpsd,uname,email) values ${options}`
        } else if (table === 'goodmsg') {
          sql = `insert into ${table}(goodname,gooddesc,goodimg,imgs,freight,type,capacity,classify,brand,price) values ${options}`
        } else if (table === 'slider') {
          sql = `insert into ${table}(sliderimg) values ${options}`
        } else if (table === 'navbtns') {
          sql = `insert into ${table}(name,url) values ${options}`
        } else if (table === 'functionmode') {
          sql = `insert into ${table}(functionName,img,url) values ${options}`
        } else if (table === 'video') {
          sql = `insert into ${table}(title,img,url) values ${options}`
        } else if (table === 'background') {
          sql = `insert into ${table}(background) values ${options}`
        } else {
          sql = `insert into ${table} values ${options}`
        }
      } else if (way === 'before') {
        if (table === 'cart') {
          sql = `insert into ${table}(userid,goodid,goodname,gooddesc,goodcount,goodprice,goodfreight,goodimg) values ${options}`
        } else if (table === 'receipt') {
          sql = `insert into ${table}(userid,username,phone,province,city,area,detail,flag) values ${options}`
        } else if (table === 'user') {
          sql = `insert into ${table}(userphone,userpsd,uname,header) values ${options}`
        } else if (table === 'orders')
          sql = `insert into ${table}(userid,buyname,username,orderprice,phone,goodid,goodcount,province,city,area,detail,createtime,paystatus,payWay) values ${options}`
      }
      // if (table === 'user') {
      //   sql = `insert into ${table}(userphone,userpsd,uname,header) values ${options}`
      // } else {
      //   sql = `insert into ${table} values ${options}`
      // }
      // console.log('sqllll', sql)
      connection.query(sql, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        if (data.affectedRows !== 0) {
          reslove({ code: 1, msg: `插入了${data.affectedRows}条` })
        }
      })
    })
  }

  // 删
  delete(table, option) {
    return new Promise((reslove, reject) => {
      this.connect()
      let sql = `delete from ${table} where ${option}`
      // console.log(sql)
      connection.query(sql, (err, data) => {
        if (err) {
          reject(err)
        }
        if (data.affectedRows !== 0) {
          reslove({ code: 1, message: `删除数据${data.affectedRows}条` })
        }
      })
    })
  }

  // 改
  update(table, option1, option2) {
    return new Promise((reslove, reject) => {
      this.connect()
      let sql = `update ${table} set ${option1} where ${option2}`
      // console.log('sql', sql)
      connection.query(sql, (err, data) => {
        if (err) {
          // console.log('errsss', err)
          reject(err)
        }
        if (data.affectedRows !== 0) {
          reslove({ code: 1, msg: `更新了${data.affectedRows}条` })
        }
      })
    })
  }

  // 查
  find(option1, table, option2) {
    return new Promise((reslove, reject) => {
      this.connect()
      let sql = ''
      if (arguments.length === 2) {
        sql = `select ${option1} from ${table}`
      } else {
        sql = `select ${option1} from ${table} where ${option2}`
      }

      console.log('sql', sql)
      connection.query(sql, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        reslove(data)
      })
    })
  }

  other(sql) {
    // console.log('sql', sql)
    return new Promise((reslove, reject) => {
      this.connect()
      connection.query(sql, (err, data) => {
        if (err) {
          reject({ code: 0, reslut: '失败' })
          return
        }
        reslove({ code: 1, reslut: '请求成功' })
      })
    })
  }
}

module.exports = db
// let dbs = db.isconnect()

// // dbs
// //   .insert('user', `('173117034','12345678','zhangxue','locoalhost:666/03.png')`)
// //   .then((res) => {
// //     console.log(res)
// //   })
// //   .catch((err) => {
// //     console.log(err)
// //   })

// // dbs
// //   .delete('user', 'userid = 173117034')
// //   .then((res) => {
// //     console.log(res)
// //   })
// //   .catch((err) => {
// //     console.log(err)
// //   })

// dbs
//   .update('user', 'uname = 173117002', 'userid = 173117002')
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// dbs
//   .find('*', 'user')
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
