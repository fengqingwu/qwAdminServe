'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 文件操作函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var qwFile = function () {
    /**
     * 构造函数
     */
    function qwFile() {
        _classCallCheck(this, qwFile);

        this.fs = _fs2.default;
    }
    /**
     * 写入文件
     * @param {文件路径} filePath 
     * @param {需要写入的内容} data 
     */


    _createClass(qwFile, [{
        key: 'write',
        value: function write(filePath, data) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.fs.writeFile(filePath, data, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                        console.log('file save successfully '); //文件被保存
                    }
                });
            });
        }
        /**
         * 读取文件
         * @param {文件路径} filePath 
         * @param {编码规则} encoding 
         */

    }, {
        key: 'read',
        value: function read(filePath, encoding) {
            var length = arguments.length;
            if (length < 2) {
                encoding = 'utf-8';
            }
            return new Promise(function (resolve, reject) {
                _fs2.default.readFile(filePath, encoding, function (err, data) {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(data);
                    }
                });
            });
        }
        /**
         * 复制文件内容
         * @param {原路径} srcFile 
         * @param {目标路径} newFile 
         */

    }, {
        key: 'copy',
        value: function copy(srcFile, newFile) {
            var _this2 = this;

            var readOption = {
                flags: 'r',
                encoding: null,
                mode: 438
            };
            var writeOption = {
                flags: 'a',
                encoding: null,
                mode: 438
            };
            return new Promise(function (resolve, reject) {
                var fileReadStream = _this2.fs.createReadStream(srcFile, readOption);
                var fileWriteStream = _this2.fs.createWriteStream(newFile, writeOption);
                /* 1:
                    fileReadStream.on('data',function(data){
                        fileWriteStream.write(data);
                              });
                    fileReadStream.on('end',function(){
                        console.log('readStream end');
                        fileWriteStream.end();
                    });
                */
                /**
                 * 2:
                 */
                fileReadStream.pipe(fileWriteStream);
                fileWriteStream.on('close', function () {
                    resolve();
                    fileReadStream.close();
                    fileWriteStream.close();
                    //copy over
                });
            });
        }
        /**
         * 
         * @param {文件是否存在} path 
         */

    }, {
        key: 'isHas',
        value: function isHas(path) {
            return new Promise(function (resolve, reject) {
                _fs2.default.exists(path, function (has) {
                    if (has) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    }, {
        key: 'mkdir',
        value: function mkdir(dirname) {
            return new Promise(function (resolve, reject) {
                _fs2.default.mkdir(dirname, 777, function (e) {
                    if (e) {
                        reject(e);
                    } else {
                        resolve(e);
                    }
                });
            });
        }
    }]);

    return qwFile;
}();

exports.default = qwFile;