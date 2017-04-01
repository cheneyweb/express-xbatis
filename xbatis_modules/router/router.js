var express = require('express')
var router = express.Router()
var passport = require(__dirname + '/../auth/passport_config.js')
var QueryController = require(__dirname + '/../controller/QueryController.js')
var log = require('tracer').colorConsole({ level: require('config').get('log').level })

// 配置路由与Controller,Dao方法的绑定
// 查询数据
router.post('/*/*', function(req, res) {
    // 从请求路径中获取Controller名称，Dao和其方法名称
    req.mapperName = req.path.split('/')[1] + '.' + transJavaStyle(req.path.split('/')[2]); // user.findAll
    // 动态加载对应名称的方法
    QueryController.query(req, res)
});

// 登录认证
router.post('/user/login', passport.authenticate('local', { failureFlash: true }), function(req, res) {
    // log.info(req.user)
    res.send("success")
});

// 认证测试
router.get('/user/testauth', passport.authenticateMiddleware(), function(req, res) {
    res.send('允许访问')
});

// function ucfirst(str) {
//     str = str.toLowerCase();
//     str = str.replace(/\b\w+\b/g, function(word) {
//         return word.substring(0, 1).toUpperCase() + word.substring(1);
//     });
//     return str;
// }

function transJavaStyle(str) {
    var re = /_(\w)/g;
    return str.replace(re, function($0, $1) {
        return $1.toUpperCase()
    });
}

module.exports = router
