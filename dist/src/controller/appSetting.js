"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSkinSetting = exports.getSkinSetting = exports.getBaseSettingApi = exports.baseSettingApi = undefined;

var _returnFomat = require("../utils/returnFomat.js");

var _base = require("../validate/base.js");

var _baseSetting = require("../validate/baseSetting.js");

var _file = require("../utils/file.js");

var _file2 = _interopRequireDefault(_file);

var _config = require("../config/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 设置首页基础配置
 * @param {request} req 
 * @param {response} res 
 */
var baseSettingApi = exports.baseSettingApi = function baseSettingApi(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var params = req.body;
    var validate_res = (0, _base.valiate)(params, _baseSetting.baseSettingApi_rules);
    if (validate_res.result) {
        var f = new _file2.default();
        f.read(_config2.default.vueAppRootPath + "/index.html").then(function (data) {
            data = data.replace(/app\-name\s{0,}\=\s{0,}\"(.*){0,}\"/, 'app-name = "' + params.appName + '"');
            data = data.replace(/company\-name\s{0,}\=\s{0,}\"(.*){0,}\"/, 'company-name = "' + params.companyName + '"');
            data = data.replace(/logout\-page\s{0,}\=\s{0,}\"(.*){0,}\"/, 'logout-page = "' + params.logoutUrl + '"');
            data = data.replace(/app\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'app-url = "' + params.appUrl + '"');
            data = data.replace(/upload\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'upload-url = "' + params.uploadUrl + '"');
            data = data.replace(/static\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'static-url = "' + params.staticUrl + '"');
            data = data.replace(/app\-timeout\s{0,}\=\s{0,}\"(.*){0,}\"/, "app-timeout = \"" + params.timeoutNumber + '"');
            data = data.replace(/debug\s{0,}\=\s{0,}\"(.*){0,}\"/, 'debug = "' + params.debug + '"');
            f.write(_config2.default.vueAppRootPath + "/index.html", data).then(function () {
                return res.send({ result: true, message: "操作成功！", status: 200 });
            }).catch(function (e) {
                return res.send({ result: false, message: "文件写入失败！", status: 200 });
            });
        }).catch(function (e) {
            (0, _returnFomat.ajaxReturn)(res, "读取失败！", {}, 405);
        });
        // ajaxReturn(res, "操作成功！", validate_res, 200);
    } else {
        (0, _returnFomat.ajaxReturn)(res, validate_res.errMsg, {}, 405);
    }
};
/**
 * 获取首页基础配置
 * @param {request} req 
 * @param {response} res 
 */
/**
 *  用于框架基本配置
 */
var getBaseSettingApi = exports.getBaseSettingApi = function getBaseSettingApi(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var f = new _file2.default();
    f.read(_config2.default.vueAppRootPath + "/index.html").then(function (data) {
        var data_ret = {};
        var temp = void 0;
        temp = {
            appName: data.match(/app\-name\s{0,}\=\s{0,}\"(.*){0,}\"/),
            companyName: data.match(/company\-name\s{0,}\=\s{0,}\"(.*){0,}\"/),
            logoutUrl: data.match(/logout\-page\s{0,}\=\s{0,}\"(.*){0,}\"/),
            appUrl: data.match(/app\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            uploadUrl: data.match(/upload\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            staticUrl: data.match(/static\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            timeoutNumber: data.match(/app\-timeout\s{0,}\=\s{0,}\"(.*){0,}\"/),
            debug: data.match(/debug\s{0,}\=\s{0,}\"(.*){0,}\"/)
        };
        for (var attr in temp) {
            data_ret[attr] = temp[attr] ? temp[attr][1] : "";
            if (attr == "debug") {
                data_ret[attr] = temp[attr][1].trim() == "true" ? true : false;
            }
        }
        (0, _returnFomat.ajaxReturn)(res, "操作成功！", data_ret, 200);
    }).catch(function (e) {
        (0, _returnFomat.ajaxReturn)(res, "读取失败！", {}, 405);
    });
};
/**
 * 获取皮肤设置
 * @param {request} req 
 * @param {response} res 
 */
var getSkinSetting = exports.getSkinSetting = function getSkinSetting(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var f = new _file2.default();
    f.read(_config2.default.vueAppRootPath + "/src/store/modules/skin.js").then(function (data) {
        var temp = {
            mainHColor: data.match(/\s{1,}mainHColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            mainMColor: data.match(/\s{1,}mainMColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            mainLColor: data.match(/\s{1,}mainLColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            logoBlockBg: data.match(/\s{1,}logoBlockBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            logoBlockStyle: data.match(/\s{1,}logoBlockStyle\s{0,}\:\s{0,}"(.{0,})\"/),
            topBlockBg: data.match(/\s{1,}topBlockBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            sideNavBg: data.match(/\s{1,}sideNavBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            sideNavColor: data.match(/\s{1,}sideNavColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            sideNavHeight: data.match(/\s{1,}sideNavHeight\s{0,}\:\s{0,}(\d{1,})\,/),
            sideNavActiveBgColor: data.match(/\s{1,}sideNavActiveBgColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            isShowTop: data.match(/\s{1,}isShowTop\s{0,}\:\s{0,}(\"(true|false)\"|(true|false))\,/),
            topBoxStyle: data.match(/\s{1,}topBoxStyle\s{0,}\:\s{0,}\"(.{0,})\"/),
            sideBarBoxStyle: data.match(/\s{1,}sideBarBoxStyle\s{0,}\:\s{0,}"(.{0,})\"/),
            pagePad: data.match(/\s{1,}pagePad\s{0,}\:\s{0,}(\d{1,})\,/)
        };
        var data_ret = {};
        for (var attr in temp) {
            data_ret[attr] = temp[attr] ? temp[attr][1] : "";
            if (attr == "isShowTop") {
                data_ret[attr] = temp[attr][1].replace(/\"/g, "").toLowerCase() == "true" ? true : false;
            } else if (/^\d{1,}$/.test(data_ret[attr])) {
                data_ret[attr] = parseInt(data_ret[attr]);
            }
        }
        (0, _returnFomat.ajaxReturn)(res, "操作成功！", data_ret, 200);
    }).catch(function (e) {
        (0, _returnFomat.ajaxReturn)(res, "读取失败！", {}, 405);
    });
};

var setSkinSetting = exports.setSkinSetting = function setSkinSetting(req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    var fileName = _config2.default.vueAppRootPath + "/src/store/modules/skin.js";
    var params = req.body;
    if ("" != params.pagePad) params.pagePad = parseInt(params.pagePad);
    if ("" != params.sideNavHeight) params.sideNavHeight = parseInt(params.sideNavHeight);
    var validate_res = (0, _base.valiate)(params, _baseSetting.baseSettingSkin_rules);
    if (validate_res.result) {
        var replaceFunc = function replaceFunc(dataStr, key, params) {
            if (undefined == params[key]) {
                return dataStr;
            }
            var exp = new RegExp("\\\s{1}" + key + "\\\s{0,}\:\\\s{0,}\\\"{0,}(.*){0,}\\\"{0,}\\\s{0,}\\\,");
            return (/^\d{1,}$/.test(params[key]) ? dataStr.replace(exp, " " + key + " : " + params[key] + ',') : dataStr.replace(exp, " " + key + " : \"" + params[key] + '\",')
            );
        };
        var f = new _file2.default();
        f.read(fileName).then(function (data) {
            var keys = ["mainHColor", "mainMColor", "mainLColor", "logoBlockBg", "logoBlockStyle", "topBlockBg", "sideNavBg", "sideNavColor", "sideNavHeight", "sideNavActiveBgColor", "isShowTop", "topBoxStyle", "sideBarBoxStyle", "pagePad"];
            for (var attr in keys) {
                data = replaceFunc(data, keys[attr], params);
            }
            f.write(fileName, data).then(function () {
                return res.send({ result: true, message: "操作成功！", status: 200 });
            }).catch(function (e) {
                return res.send({ result: false, message: "文件写入失败！", status: 200 });
            });
        }).catch(function (e) {
            (0, _returnFomat.ajaxReturn)(res, "操作失败！请稍后重试！", { e: e }, 405);
        });
        // res.send(ajaxReturn(res, "test", params, 200));    
    } else {
        (0, _returnFomat.ajaxReturn)(res, validate_res.errMsg, {}, 405);
    }
    // res.send(ajaxReturn(res,"test",params,200));    
};