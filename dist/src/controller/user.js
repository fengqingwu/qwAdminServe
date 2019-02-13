"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkUser = exports.login = undefined;

var _returnFomat = require("../utils/returnFomat.js");

var _base = require("../validate/base.js");

var _user = require("../validate/user.js");

var UserModel = require('../model/user.js').User; /* 用户处理 */
var login = exports.login = function login(req, res) {
    var params = req.body;
    var validate_res = (0, _base.valiate)(params, _user.login_rules);
    if (validate_res.result) {
        UserModel.findOne({ where: {
                count: params.userName,
                pass: params.userPass
            } }).then(function (data) {
            req.session.user = data;
            (0, _returnFomat.ajaxReturn)(res, "success", { id: data.id, userName: data.count }, 200);
        }).catch(function (err) {
            (0, _returnFomat.ajaxReturn)(res, "用户名或密码错误", err, 405);
        });
    } else (0, _returnFomat.ajaxReturn)(res, validate_res.err_msg, params, 405);
};
var checkUser = exports.checkUser = function checkUser(req, res) {
    var params = req.body;
    var validate_res = (0, _base.valiate)(params, checkUser_rules);
    if (validate_res.result) {
        if (req.session.user && req.session.user.count == params.userName) {
            (0, _returnFomat.ajaxReturn)(res, "用户名未登录", {}, 300);
        } else {
            (0, _returnFomat.ajaxReturn)(res, "success", {}, 300);
        }
    } else {
        (0, _returnFomat.ajaxReturn)(res, validate_res.err_msg, params, 405);
    }
};