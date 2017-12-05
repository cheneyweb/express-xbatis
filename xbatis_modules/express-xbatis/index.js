const express = require('express')
const router = express.Router()
const QueryController = require(__dirname + '/controller/QueryController.js')
const log = require('tracer').colorConsole()

/**
 * 初始化连接数据库
 */
router.initConnect = function (nodebatis) {
    router.nodebatis = nodebatis
}

// 配置路由与Controller,Dao方法的绑定
router.post('/:model_name/:method_name', async function (req, res) {
    try {
        // 从请求路径中获取Controller名称，Dao和其方法名称
        req.mapperName = req.params.model_name + '.' + transJavaStyle(req.params.method_name) // user.findAll
        // 动态加载对应名称的方法
        // 动态加载对应名称的方法
        const result = await QueryController.query(router.nodebatis, req)
        res.send(okRes(result))
    } catch (error) {
        log.error(error)
        res.send(errRes('路由服务异常'))
    }
})

function okRes(res) {
    return { err: false, res: res }
}
function errRes(res) {
    return { err: true, res: res }
}

function transJavaStyle(str) {
    var re = /_(\w)/g;
    return str.replace(re, function ($0, $1) {
        return $1.toUpperCase()
    });
}

module.exports = router
