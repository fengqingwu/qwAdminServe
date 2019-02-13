"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
api 接口返回处理函数
*/
var ajaxReturn = exports.ajaxReturn = function ajaxReturn(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

    res.send({
        result: code == 200,
        message: message,
        model: data
    });
};

var ajaxReturnGrid = exports.ajaxReturnGrid = function ajaxReturnGrid(res) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var numRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var code = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 200;

    return res.send({
        result: code == 200,
        model: {
            numRows: 0,
            message: message,
            items: []
        }
    });
};