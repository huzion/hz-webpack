/**
 * @description 首页
 */

const helper = require('../libs/helper');

module.exports = function *() {
    this.render({
        title: '首页 - 欢迎访问',
    }, 'index');
};
