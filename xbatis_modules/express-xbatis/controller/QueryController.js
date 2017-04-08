var log = require('tracer').colorConsole()
var QueryDao = require(__dirname + '/../dao/QueryDao.js')

/**
 * [ModelController 实体控制器，接收路由入参JSON，自定义mapper进行SQL操作]
 * @type {Object}
 */
var QueryController = {
    /**
     * [query 通过JSON入参JSON进行自定义查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    query: function(req, res) {
        QueryDao.execsql(req.mapperName, req.body)
        .then(function(result) {
            res.send(result)
        })
        .catch(function(err) {
            log.error(err.message);
        })
    }
};

module.exports = QueryController
