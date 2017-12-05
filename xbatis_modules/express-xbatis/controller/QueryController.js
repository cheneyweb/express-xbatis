const log = require('tracer').colorConsole()
/**
 * [ModelController 实体控制器，接收路由入参JSON，自定义mapper进行SQL操作]
 * @type {Object}
 */
const QueryController = {
    /**
     * [query 通过JSON入参JSON进行自定义查询]
     * @param  {[type]} nodebatis [description]
     * @param  {[type]} req       [description]
     * @return {[type]}           [description]
     */
    query: function (nodebatis, req) {
        return new Promise((resolve, reject) =>
            nodebatis.execute(req.mapperName, req.body)
                .then(function (result) {
                    resolve(result)
                })
                .catch(function (err) {
                    log.error(err.message)
                    reject(err.message)
                })
        )
    }
}

module.exports = QueryController
