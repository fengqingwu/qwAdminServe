"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    port: 9999, //服务端口
    rootPath: _path2.default.resolve(__dirname, "../../"), //服务根目录
    vueAppRootPath: _path2.default.resolve(__dirname, "../../../../qwAdmin"), //应用根目录 主要用于qwTemplate
    session: { //session相关
        sessionCookieName: "qwframe_sid", //session name 用于标识session的cookie名字
        sessionSecret: "jacktan", //session 加密密钥
        sessinStoreType: "mysql", //session 驱动类型 redis | mysql 请自行扩展其他如 memery 等 
        sessionLifeTime: 1000 * 60 * 60 * 24 //session 有效期
    }
};
exports.default = config;