var express = require('express')
var router = express.Router()
var QueryController = require(__dirname + '/controller/QueryController.js')
var log = require('tracer').colorConsole()

// 配置路由与Controller,Dao方法的绑定
// 查询数据
router.post('/*/*', function(req, res) {
    // 从请求路径中获取Controller名称，Dao和其方法名称
    req.mapperName = req.path.split('/')[1] + '.' + transJavaStyle(req.path.split('/')[2]); // user.findAll
    // 动态加载对应名称的方法
    QueryController.query(req, res)
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
