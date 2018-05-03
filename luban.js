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
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const path = require('path')


const app = new Koa()
app.use(logger())
app.use(bodyParser());

// 实现静态资源服务器
app.use(staticServer(__dirname))

// 接收表单留言
router.post('/mail', async (ctx) => {
    ctx.status = 200
    ctx.body = ctx.request.body
})

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(2000)
console.log('The backend service was started at port 2000...')