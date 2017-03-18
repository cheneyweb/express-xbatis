var log = require('tracer').colorConsole({ level: require('config').get('log').level });
var nodebatis = require('../nodebatis/nodebatis.js');

var QueryDao = {
    execsql: async function findAll(mapper, param) {
        try {
            let result = await nodebatis.execute(mapper, param)
            log.info(result)
            return result;
        } catch (e) {
            log.error(e)
        }
    }
}

module.exports = QueryDao;
