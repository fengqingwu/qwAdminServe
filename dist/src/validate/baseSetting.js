"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseSettingApi_rules = exports.baseSettingApi_rules = {
    appName: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "应用名称不能为空！" };
            } else if (!/^\S{2,30}$/.test(value)) {
                return { result: false, errMsg: "用户名2-30个字符组成！" };
            } else {
                return { result: true };
            }
        }
    }],
    companyName: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "企业名称不能为空！" };
            } else if (!/^\S{2,50}$/.test(value)) {
                return { result: false, errMsg: "企业名称2-50个字符组成！" };
            } else {
                return { result: true };
            }
        }
    }],
    appUrl: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "api请求地址不能为空" };
            } else if (!/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)) {
                return { result: false, errMsg: "api请求地址必须由http|https开头的url地址" };
            } else {
                return { result: true };
            }
        }
    }],
    uploadUrl: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "文件上传地址不能为空" };
            } else if (!/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)) {
                return { result: false, errMsg: "文件上传地址必须由http|https开头的url地址" };
            } else {
                return { result: true };
            }
        }
    }],
    staticUrl: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "静态资源地址不能为空" };
            } else if (!/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)) {
                return { result: false, errMsg: "静态资源地址必须由http|https开头的url地址" };
            } else {
                return { result: true };
            }
        }
    }],
    logoutUrl: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "账户退出地址不能为空" };
            } else if (!/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)) {
                return { result: false, errMsg: "账户退出地址必须由http|https开头的url地址" };
            } else {
                return { result: true };
            }
        }
    }],
    timeoutNumber: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined == value) {
                return { result: false, errMsg: "api超时时间不能为空" };
            } else if (isNaN(value)) {
                return { result: false, errMsg: "api超时时间必须是数字" };
            } else {
                return { result: true };
            }
        }
    }],
    debug: [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "debug模式为true|false" };
            } else {
                return { result: true };
            }
        }
    }]
    // logoBlockBackground: #f0f2f5
    // sideMenuBackground: #00142a
    // sideMenuHeight: 40
    // sidebarActiveColor: #2a93ff
};

var baseSettingSkin_rules = exports.baseSettingSkin_rules = {
    "mainHColor": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "主色调（高亮色）不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "主色调（高亮色）必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#409eff",
    "mainMColor": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "主色调（常规色）不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "主色调（常规色）必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#666",
    "mainLColor": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "主色调（次色）不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "主色调（次色）必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#999",
    "logoBlockBg": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "Logo区域背景色不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "Logo区域背景色必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#f0f2f5",
    "topBlockBg": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "顶部区域背景色不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "顶部区域背景色必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#FFF",
    "sideNavBg": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "侧边栏菜单栏背景色不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "侧边栏菜单栏必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#00142a",
    "sideNavHeight": [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "侧边栏菜单高度不能为空" };
            } else if (!/^\d{1,}$/.test(value)) {
                return { result: false, errMsg: "侧边栏菜单高度必须是数字" };
            } else {
                return { result: true };
            }
        }
    }], //"40",
    "sideNavActiveBgColor": [{
        rquired: true,
        validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "侧边栏菜单激活项背景色不能为空！" };
            } else if (!/\#[0-9|A-F|a-f]{3,6}/.test(value)) {
                return { result: false, errMsg: "侧边栏菜单激活项背景色必须是#和16进制数据组成" };
            } else {
                return { result: true };
            }
        }
    }], //"#409eff",
    "isShowTop": [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "是否显示顶部参数必须为true|false" };
            } else {
                return { result: true };
            }
        }
    }], //"true",
    // "topBoxStyle": "",
    // "sideBarBoxStyle": "",
    "pagePad": [{
        rquired: true, validator: function validator(rule, value) {
            if (value === "" || undefined === value) {
                return { result: false, errMsg: "页面主区域间距不能为空" };
            } else if (!/^\d{1,}$/.test(value)) {
                return { result: false, errMsg: "页面主区域间距必须是数字" };
            } else {
                return { result: true };
            }
        }
    }] //"10"
};