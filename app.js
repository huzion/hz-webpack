const koa = require('koa');
const app = koa();
const koaBody = require('koa-body');
const favicon = require('koa-favicon');
const session = require('koa-session');
const serve = require('koa-static');
const log4js = require('log4js');
const setting = require('./libs/settings');
const middleware = require('./libs/middleware');
const router = require('./libs/router');
const dirname = __dirname;

// 配置log4js 全局通用 只需设置一次
log4js.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'basic'
        }
    }],
    replaceConsole: true
});

const logger = log4js.getLogger('app');

// 设置签名cookie密钥，在进行cookie签名时，只有设置signed 为 true 时，才会使用密钥进行加密
app.keys = ['hz-webpack'];

app
    .use(favicon(dirname + '/favicon.ico'))
    .use(koaBody())
    .use(serve(dirname + '/statics'))
    .use(session({key:setting.sessionKey},app))
    .use(middleware())
    .use(router(app))
    .listen(setting.port, '127.0.0.1', () => {
        logger.info('Node listen at ' + setting.port);
    });
