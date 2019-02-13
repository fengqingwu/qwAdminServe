"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueApp = require("../controller/vueApp.js");

var _user = require("../controller/user.js");

var _returnFomat = require("../utils/returnFomat.js");

var _test = require("../controller/test.js");

var _appSetting = require("../controller/appSetting.js");

//  import {
//     favicon
// } from "../controller/favicon.js"
// import {index} from "../controller/index.js"
exports.default = [
// {
//     type:"get",
//     path:"/favicon.ico",
//     func:favicon
// },
{
    type: "get",
    path: "/test",
    func: _test.test
}, {
    type: "post",
    path: "/writeRoute",
    func: _vueApp.writeRouter
}, {
    type: "post",
    path: "/writeMenu",
    func: _vueApp.writeMenu
}, {
    type: "post",
    path: "/writeRouteLink",
    func: _vueApp.writeRouteLink
}, {
    type: "post",
    path: "/getMenu",
    func: _vueApp.getMenu
}, {
    type: "post",
    path: "/login",
    func: _user.login
}, {
    type: "post",
    path: "/baseSettingApi",
    func: _appSetting.baseSettingApi
}, {
    type: "post",
    path: "/getBaseSettingApi",
    func: _appSetting.getBaseSettingApi
}, {
    type: "post",
    path: "/getSkinSetting",
    func: _appSetting.getSkinSetting
}, {
    type: "post",
    path: "/setSkinSetting",
    func: _appSetting.setSkinSetting
}, {
    type: "post",
    path: "/checkUser",
    func: _user.checkUser
}, {
    type: "get",
    path: "/logout",
    func: function func(req, res) {
        req.session.user = null;
        res.header('Content-Type', 'text/html');
        res.render('logout.ejs', { title: '用户退出 - 页面跳转', msg: "用户已退出", href: "/index.html", timeout: 5 });
    }
}, { //404页面
    type: "get",
    path: "*",
    func: function func(req, res) {
        res.header('Content-Type', 'text/html');
        res.render('404.ejs', { title: '页面不存在 - 404', timeout: 5 });
    }
}, {
    type: "post",
    path: "*",
    func: function func(req, res) {
        (0, _returnFomat.ajaxReturn)(res, "非法的访问路径", {}, 405);
    }
}];