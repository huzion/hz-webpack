/**
 * @description 设置模块，主要配置环境变量，api和url等
 * @author hz
 */

const config  = require('../config');
const setting = config;
const _env    = config.env;
let { _apiEnv, apiUrl, staticUrl } = '';

// 判断环境
if(_env !== 'www') {
    _apiEnv   = config.apiEnv || _env;
    apiUrl    = '//' + _apiEnv + '.' + config.domain.api;
    staticUrl = _env + '.' + config.domain.static;
} else {
    _apiEnv   = _env;
    apiUrl    = '//' + config.domain.api;
    staticUrl = config.domain.static;
}

setting.apiUrl    = apiUrl;
setting.apiEnv    = _apiEnv;
setting.staticUrl = staticUrl;

module.exports = setting;
