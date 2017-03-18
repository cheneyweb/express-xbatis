// 应用服务
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router/router.js');
// 认证相关
var expressSession = require('express-session');
var passport = require('./auth/passport_config.js');
// 日志服务
var log = require('tracer').colorConsole({ level: require('config').get('log').level });

// 初始化应用服务器
var app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}));
// 初始化调用 passport
app.use(passport.initialize());
app.use(passport.session());

// 使用路由统一控制(目前支持以下4种RESTful请求)
/**
 * [POST]http://host:port/xbatis/MODEL_NAME/query/METHOD_NAME
 * [POST]http://host:port/xbatis/MODEL_NAME/update/METHOD_NAME
 * [POST]http://host:port/xbatis/MODEL_NAME/insert/METHOD_NAME
 * [POST]http://host:port/xbatis/MODEL_NAME/destroy/METHOD_NAME
 */
app.use('/', router);

// 开始服务监听
var port = require('config').get('server').port;
var server = app.listen(port, function() {
    var port = server.address().port;
    log.info('##### XBatis 服务正在监听端口:', port);
});