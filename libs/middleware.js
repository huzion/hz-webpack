/**
 * @description 中间件
 * @author hz
 */

const cookie = require('cookie');
const log4js = require('logojs');
const logger = log4js.getLogger('router');
const tpl = require('./tpl');
const helper = require('./helper');

module.exports = () => {
    return function* (next) {
        //
    };
};
