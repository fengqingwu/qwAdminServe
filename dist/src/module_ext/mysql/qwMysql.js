"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _server = require("../../utils/server.js");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import mysql from "mysql"
var mysql = require('mysql');

var qwMysql = function () {
    function qwMysql() {
        _classCallCheck(this, qwMysql);

        this.init();
    }

    _createClass(qwMysql, [{
        key: "init",
        value: function init() {
            var serverObj = new _server2.default();
            var config = serverObj.getConfig();
            console.log(JSON.stringify(config));
            if (config && config.db) {
                this.config = config.db;
            } else {
                console.error("数据库配置不存在！", JSON.stringify(config));
            }
        }
    }, {
        key: "buildPool",
        value: function buildPool() {
            this.pool = mysql.createPool(this.config);
        }
    }, {
        key: "query",
        value: function query(sql) {
            var _this = this;

            if (!this.pool) {
                this.buildPool();
            }
            return new Promise(function (resolve, reject) {
                _this.pool.getConnection(function (err, conn) {
                    _this.conn = conn;
                    if (err) {
                        reject({ err: err, result: false, data: null });
                    } else {
                        _this.conn.query(sql, function (qerr, vals, fields) {
                            //释放连接
                            _this.close();
                            // conn.release();
                            resolve({ err: qerr, vals: vals, fields: fields });
                        });
                    }
                });
            });
        }
    }, {
        key: "close",
        value: function close() {
            if (!this.pool) {
                return;
            } else {
                this.pool.releaseConnection(this.conn);
            }
        }
    }]);

    return qwMysql;
}();

exports.default = qwMysql;

/*
var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
    port: port
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;

var query=require("./lib/mysql.js");

query("select 1 from 1",function(err,vals,fields){
    //do something
});
*/