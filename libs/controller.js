/**
 * @description 控制器路由设置
 * @returns {Function} 返回一个方法，传入路由器作为参数，以便对当前模块的路径进行路由设置
 */

const fs      = require('fs');
const path    = require('path');
const log4js  = require('log4js');
const logger  = log4js.getLogger('controller');
const setting = require('./setting');

const _controllerPath = '../' + setting.path.controller + '/';

const controllerMain = {
    init: (router) => {
        const _self = controllerMain;

        // 由地址列表
        // 首页
        router.get('/', function* () {
            yield _self.runController.bind(this)('index');
        });
    },

    /**
     * @description 生成器，尝试执行控制器
     * @param  {string} name 控制器的文件名
     * @returns {Generator} 返回控制器执行后的生成器对象
     */
    runController: function* (name) {
        const _self = controllerMain;

        // 尝试执行控制器定绑定当前请求
        try {
            const controller = _self.getController(name);
            yield controller.bind(this)();
        } catch (e) {
            logger.error(this.url, JSON.stringify({
                get: this.request.query,
                post: this.request.body
            }), e.stack);
        }
    },

    /**
     * @description 获取控制器文件的绝对路径，并尝试引入
     * @param  {string} name 文件名
     * @returns {Object} 引入的控制器文件对象
     */
    getController: (name) => {
        const _path = _controllerPath + name + '.js';

        // 转换绝对路径
        const filePath = path.resolve(__dirname, _path);

        // 判断文件是否存在，读取
        if(fs.existsSync(filePath)) {
            return require(_path);
        } else {
            throw Error('controller is not exists');
        }
    }
};

module.exports = controllerMain.init;
