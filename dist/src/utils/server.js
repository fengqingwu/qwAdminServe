"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _file = require("./file.js");

var _file2 = _interopRequireDefault(_file);

var _config = require("../config/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');

var qwServer = function () {
    function qwServer() {
        _classCallCheck(this, qwServer);

        this.rootPath = path.resolve(__dirname, "../../src");
    }

    _createClass(qwServer, [{
        key: "getIP",
        value: function getIP() {
            var interfaces = require('os').networkInterfaces();
            for (var devName in interfaces) {
                var iface = interfaces[devName];
                for (var i = 0; i < iface.length; i++) {
                    var alias = iface[i];
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
        }
    }, {
        key: "getConfig",
        value: function getConfig() {
            return _config2.default;
            // return new Promise((resolve,reject)=>{
            //     let f = new qwFile();
            //     f.read(this.rootPath + "/config/config.js").then(data => {
            //         resolve(data)
            //     }).catch(err=>{
            //         reject(err);
            //     })
            // })
        }
    }]);

    return qwServer;
}();

exports.default = qwServer;