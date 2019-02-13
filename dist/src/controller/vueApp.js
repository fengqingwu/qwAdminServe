"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMenu = exports.writeMenu = exports.writeRouteLink = exports.writeRouter = undefined;

var _config = require("../config/config.js");

var _config2 = _interopRequireDefault(_config);

var _file = require("../utils/file.js");

var _file2 = _interopRequireDefault(_file);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 写入路由
 * @param {request} req 
 * @param {resource} res 
 */
var writeRouter = exports.writeRouter = function writeRouter(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var json = req.body;
    var f = new _file2.default();
    if ("" == json.content || undefined == json.content) {
        return res.send({ result: false, message: "参数错误！", status: 200 });
    } else {
        var pathRoot = _config2.default.vueAppRootPath + "/src";
        /* 写入相关文件 */
        var vueFiles = JSON.parse(json.files);
        var len = vueFiles.length;
        var count = 0;
        f.read(_config2.default.rootPath + "/src/template/commonPage.vue").then(function (data) {
            var _loop = function _loop(i) {
                f.isHas(pathRoot + vueFiles[i]).then(function () {
                    count++;
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '存在')
                }).catch(function () {
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '不存在')
                    // console.log("创建路径：" + path.dirname(pathRoot + vueFiles[i]));
                    _fs2.default.mkdir(_path2.default.dirname(pathRoot + vueFiles[i]), "0777", function () {
                        var data2 = data.replace(/\$\$\$\{\{pageName\}\}\$\$\$/, vueFiles[i].split("/")[2]);
                        f.write(pathRoot + vueFiles[i], data2).then(function () {
                            count++;
                            // console.log("file:" + (pathRoot + vueFiles[i]) + '写入成功！')
                        });
                    });
                });
            };

            for (var i in vueFiles) {
                _loop(i);
            }
        });
        /* 写入路由文件 */
        var timer = setInterval(function () {
            if (count >= len) {
                clearInterval(timer);
                var pathRoute = pathRoot + "/router/router.js";
                f.write(pathRoute, json.content).then(function () {
                    console.log("返回数据");
                    return res.send({
                        result: true, message: "操作成功！", status: 200, model: {
                            path: pathRoute,
                            vueFiles: vueFiles
                        }
                    });
                }).catch(function () {
                    return res.send({ result: false, message: "数据写入失败！", status: 200 });
                });
            }
        }, 30);
    }
};
var writeRouteLink = exports.writeRouteLink = function writeRouteLink(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var json = req.body;

    var f = new _file2.default();
    if ("" == json.content || undefined == json.content) {
        return res.send({ result: false, message: "参数错误！", status: 200 });
    } else {
        var pathRoot = _config2.default.vueAppRootPath + "/src";
        /* 写入相关文件 */
        var vueFiles = JSON.parse(json.files);
        var len = vueFiles.length;
        var count = 0;
        f.read(_config2.default.rootPath + "/src/template/commonPage.vue").then(function (data) {
            var _loop2 = function _loop2(i) {
                f.isHas(pathRoot + vueFiles[i]).then(function () {
                    count++;
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '存在')
                }).catch(function () {
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '不存在')
                    // console.log("创建路径：" + path.dirname(pathRoot + vueFiles[i]));
                    _fs2.default.mkdir(_path2.default.dirname(pathRoot + vueFiles[i]), "0777", function () {
                        var data2 = data.replace(/\$\$\$\{\{pageName\}\}\$\$\$/, vueFiles[i].split("/")[2]);
                        f.write(pathRoot + vueFiles[i], data2).then(function () {
                            count++;
                            // console.log("file:" + (pathRoot + vueFiles[i]) + '写入成功！')
                        });
                    });
                });
            };

            for (var i in vueFiles) {
                _loop2(i);
            }
        });
        /* 写入路由文件 */
        var timer = setInterval(function () {
            if (count >= len) {
                clearInterval(timer);
                var pathRoute = pathRoot + "/router/router.js";
                f.write(pathRoute, json.content).then(function () {
                    var pathRouteLink = pathRoot + "/router/index.js";
                    var str = "import Vue from 'vue'\nimport Router from 'vue-router'\nimport defaultRouters  from \"./default.js\"\nimport debugRouters from \"./debugRouter.js\"\nimport router from './router.js';\n\n/* \u4E0B\u9762\u53EF\u4EE5\u6DFB\u52A0\u81EA\u5B9A\u4E49\u9875\u9762 */\n\nVue.use(Router)\nexport default new Router({\n\troutes: [\n\t\t...defaultRouters,\n\t\t...debugRouters,\n\t\t...router\n\n\t]\n})\n" + '';
                    f.write(pathRouteLink, str).then(function (result) {
                        // console.log("返回数据")
                        return res.send({
                            result: true, message: "操作成功！", status: 200, model: {
                                path: pathRoute,
                                vueFiles: vueFiles
                            }
                        });
                    });
                }).catch(function () {
                    return res.send({ result: false, message: "数据写入失败！", status: 200 });
                });
            }
        }, 30);
    }
};
/**
 * 写入菜单到index.html
 * @param {request} req 
 * @param {resource} res 
 */
var writeMenu = exports.writeMenu = function writeMenu(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var json = req.body;
    if ("" == json.menus || undefined == json.menus) {
        return res.send({ result: false, message: "参数错误", status: 200 });
    } else {
        try {
            var menus = JSON.parse(json.menus);
            if (menus.constructor === Array && menus.length > 0) {
                var f = new _file2.default();
                f.read(_config2.default.vueAppRootPath + "/index.html").then(function (data) {
                    var data2 = data.replace(/app\-menu\s{0,}=\s{0,}\'[\s|0-9|a-z|A-Z|\"|\=|\,\:\W]{0,}\'{1}/, "app-menu='" + json.menus + "'");
                    f.write(_config2.default.vueAppRootPath + "/index.html", data2).then(function () {
                        return res.send({ result: true, message: "操作成功！", status: 200 });
                    }).catch(function (e) {
                        return res.send({ result: false, message: "文件写入失败！", status: 200 });
                    });
                }).catch(function (e) {
                    return res.send({ result: false, message: "文件读取失败！", status: 200 });
                });
            } else {
                return res.send({ result: false, message: "参数错误", status: 200 });
            }
        } catch (e) {
            return res.send({ result: false, message: "参数错误", status: 200 });
        }
    }
};
var getMenu = exports.getMenu = function getMenu(req, res) {
    var f = new _file2.default();
    f.read(_config2.default.vueAppRootPath + "/index.html").then(function (data) {
        var arrMatch = data.match(/app\-menu\s{0,}=\s{0,}\'[\s|0-9|a-z|A-Z|\"|\=|\,\:\W]{0,}\'{1}/);
        if (arrMatch && arrMatch[0]) {
            arrMatch = arrMatch[0].replace(/app\-menu\s{0,}=\s{0,}\'/, "").replace(/\'$/, "");
            if (arrMatch) {
                return res.send({ result: true, match: arrMatch, message: "操作成功！", status: 200 });
            } else {
                return res.send({ result: true, match: '[]', message: "菜单为空！", status: 200 });
            }
        } else {
            return res.send({ result: false, message: "未抓取到菜单！", status: 200 });
        }
    }).catch(function (e) {
        return res.send({ result: false, message: "读取失败", status: 200 });
    });
};