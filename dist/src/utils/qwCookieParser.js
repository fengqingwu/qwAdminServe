'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cookieParser = function cookieParser(req) {
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
        var parts = Cookie.split('=');
        Cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    return Cookies;
};
exports.default = cookieParser;