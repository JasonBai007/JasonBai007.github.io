/*
 * Author: JasonBai
 * File Created: 2018/05/03 10:37:11 am
 * Last Modified: 2018/05/03 10:38:47 am
 * Copyright @ 2018 - CIG
 * When I wrote this code, only God and I knew what it was.
 * Now, only God knows!
 */

const Koa = require('koa')
const staticServer = require('koa-static')
const logger = require('koa-logger')
const path = require('path')
// const router = require('./router.js')


const app = new Koa()
app.use(logger())

// 实现静态资源服务器
console.log(__dirname)
app.use(staticServer(__dirname))

// 注册路由
// app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(2000)
console.log('The backend service was started at port 2000...')