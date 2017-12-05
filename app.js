// 系统设置
const config = require('config')
const port = config.server.port
const controllerRoot = config.server.controllerRoot
// 应用服务
const express = require('express')
const bodyParser = require('body-parser')
const nodebatis = require(__dirname + '/src/nodebatis/nodebatis.js')
const xbatis = require(__dirname + '/xbatis_modules/express-xbatis/index.js')
// 日志服务
const log = require('tracer').colorConsole({ level: config.log.level })

// 初始化应用服务器
var app = express()
app.use(bodyParser.json())

// 使用路由统一控制
xbatis.initConnect(nodebatis)   // 初始化mysql连接
app.use(controllerRoot, xbatis)

// 开始服务监听
app.listen(port)
log.info(`XBatis服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`[POST]http://localhost:${port}/xbatis/MODEL_NAME/METHOD_NAME`)

