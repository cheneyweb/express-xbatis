// 系统设置
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
// 应用服务
const express = require('express')
const bodyParser = require('body-parser')
const router = require(__dirname + '/xbatis_modules/router/router.js')
// 认证相关
const expressSession = require('express-session')
const passport = require(__dirname + '/xbatis_modules/auth/passport_config.js')
// 日志服务
const log = require('tracer').colorConsole({ level: config.get('log').level })

// 初始化应用服务器
var app = express()
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}))
// 初始化调用 passport
app.use(passport.initialize())
app.use(passport.session())

// 使用路由统一控制(目前支持以下RESTful请求)
/**
 * [POST]http://host:port/xbatis/MODEL_NAME/METHOD_NAME
 */
app.use(controllerRoot, router)

// 开始服务监听
app.listen(port, function() {
    log.info(`XBatis服务已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
    log.info(`[POST]http://host:${port}/xbatis/MODEL_NAME/METHOD_NAME`)
})
