// 路由相关
const express = require('express')
const router = express.Router()
// 控制器加载
const fs = require('fs')
// 日志
const log = require('tracer').colorConsole()

/**
 * 初始化数据库连接，加载所有中间件路由
 */
router.init = function (app, nodebatis, options) {
    router.nodebatis = nodebatis
    const middlewareDir = `${process.cwd()}${options.middlewareDir || '/src/middleware/'}`
    const controllerRoot = options.xbatisRoot || '/xbatis'
    const afterRouterArr = []
    fs.readdirSync(middlewareDir).forEach(function (filename) {
        if (filename.startsWith('pre')) {
            let router = require(`${middlewareDir}/${filename}`)
            app.use(controllerRoot, router)
        }
    })
    log.info('xbatis所有前置路由已加载')
    app.use(controllerRoot, router)
    log.info('xbatis所有执行路由已加载')
    fs.readdirSync(middlewareDir).forEach(function (filename) {
        if (filename.startsWith('after')) {
            afterRouterArr.push(filename.split('-')[1].split('.')[0])
            let router = require(`${middlewareDir}/${filename}`)
            app.use(controllerRoot, router)
        }
    })
    router.afterRouterArr = afterRouterArr
    log.info('xbatis所有后置路由已加载')
}

// 配置路由与Controller,Dao方法的绑定
router.post('/:model_name/:method_name', async function (req, res, next) {
    try {
        // 从请求路径中获取Controller名称，Dao和其方法名称
        let mapperName = req.params.model_name + '.' + transJavaStyle(req.params.method_name) // example：user.findAll
        // 执行mapper操作
        let result = await router.nodebatis.execute(mapperName, req.body)
        if (router.afterRouterArr.indexOf(req.params.model_name) != -1) {
            res.result = okRes(result)
        } else {
            res.send(okRes(result))
        }
        return next()
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
