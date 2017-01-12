const config = require('./config.yml');

// 目录配置
config.path = {
    controller: 'controllers',
    view: 'views'
};

config.sessionKey = 'hz-webpack';

module.exports = config;
