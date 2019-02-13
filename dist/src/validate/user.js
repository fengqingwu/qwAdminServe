"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var login_rules = exports.login_rules = {
    userName: [{ rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "用户名不能为空！" };
            } else if (!/^[a-zA-Z_0-9]{6,20}$/.test(value)) {
                return { result: false, errMsg: "用户名为字母数字下划线组成6-20个字符组成！" };
            } else {
                return { result: true };
            }
        } }],
    userPass: [{
        required: true, validator: function validator(rule, value, callback) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "用户密码不能为空！" };
            } else if (value.length < 6 || value.length > 20) {
                return { result: false, errMsg: "用户密码由6-20位字符组成！" };
            } else {
                return { result: true };
            }
        } }]
};

var checkUser_rules = exports.checkUser_rules = {
    userName: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "用户名不能为空！" };
            } else if (!/^[a-zA-Z_0-9]{6,20}$/.test(value)) {
                return { result: false, errMsg: "用户名为字母数字下划线组成6-20个字符组成！" };
            } else {
                return { result: true };
            }
        }
    }]
};