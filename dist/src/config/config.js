"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require("./app.js");

var _app2 = _interopRequireDefault(_app);

var _mysql = require("./mysql.js");

var _mysql2 = _interopRequireDefault(_mysql);

var _redis = require("./redis.js");

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};
var addConfig = function addConfig(data) {
    for (var attr in data) {
        config[attr] = data[attr];
    }
};
addConfig(_app2.default);
addConfig(_mysql2.default);
addConfig(_redis2.default);

exports.default = config;