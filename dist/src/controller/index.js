"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = undefined;

var _file = require("../utils/file.js");

var _file2 = _interopRequireDefault(_file);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config  from "../config/config.js"
var index = exports.index = function index(req, res) {
    // res.send(config.rootPath);
    // return;
    var f = new _file2.default();
    var viewPath = _path2.default.resolve(__dirname, "../view");
    res.header("Content-Type", "text/html;charset=utf-8");
    f.isHas(viewPath + "/index.html").then(function () {
        f.read(viewPath + "/index.html").then(function (data) {
            res.send(data);
        });
    }).catch(function () {
        res.send("模板“/view/index.html”不存在！");
    });
};