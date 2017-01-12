/**
 * @description 定义模板渲染方法
 * @returns {Function} module.exports暴露一个模板渲染方法
 */

const fs   = require('fs');
const path = require('path');
const _    = require('loadsh');
const ejs  = require('ejs');

const setting  = require('./setting');
const viewPath = '../' + setting.path.view;
const dirname  = __dirname;

module.exports = function (data, tpl, status) {
    // 生成html文件所在路径
    const file = path.join(dirname, viewPath, tpl + 'html');
    let _html = '';

    // 合并对象
    _.extend(this._data, data);
    this.status = status || 200;

    // ejs渲染
    _html = ejs.render(fs.readFileSync(file).toString(), this._data);

    // 定义返回的正文实体
    this.body = _html;
};
