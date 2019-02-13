"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _server = require("./utils/server.js");

var _server2 = _interopRequireDefault(_server);

var _router = require("./router/router.js");

var _router2 = _interopRequireDefault(_router);

var _config = require("./config/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * node js server created by 谭成才 qq 841196685 
 * 项目构建方法参考 https://blog.csdn.net/weixin_36897085/article/details/79154105
 * 2018/11/02
 */

var app = (0, _express2.default)();

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '1mb' })); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.set('views', _path2.default.join(__dirname, '/template'));
// app.set('view engine', 'jade');
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//option.genid(res)
app.use(_express2.default.static(_path2.default.join(__dirname, '../../static')));

//////////////////////////////////////////////init session/////////////////////////////////////////////////////

// init session
var session = require('express-session');
var base64 = require('./utils/base64.js');

switch (_config2.default.session.sessinStoreType) {
    case "redis":
        {
            var redis = require('redis'),
                client = redis.createClient({ password: _config2.default.redis.password }),
                //这里填写redis的密码
            RedisStore = require('connect-redis')(session);
            client.on("error", function (err) {
                console.log("redisClientError==> " + err); //用于提示错误信息
            });
            var options = {
                port: _config2.default.redis.port,
                host: _config2.default.redis.host,
                client: client
                //console.log("config.db====>", JSON.stringify(config.redis))
            };app.use(session({
                resave: false, //添加 resave 选项
                saveUninitialized: true, //添加
                name: _config2.default.session.sessionCookieName,
                secret: _config2.default.session.sessionSecret,
                cookie: {
                    maxAge: _config2.default.session.sessionLifeTime
                },
                // genid: function (sess) {
                //     console.log("genid done!!!")
                //     return base64.encode(new Date().getTime() + Math.random());
                //     // return buildSessionId(req);
                // },
                store: new RedisStore(options)
            }));
        }
        break;
    case "mysql":
        {
            console.log("session mod mysql!!!!");
            var MySQLStore = require('express-mysql-session')(session);
            var _options = {
                host: _config2.default.db.host,
                user: _config2.default.db.user,
                password: _config2.default.db.password,
                port: _config2.default.db.port,
                database: _config2.default.db.database
                // genid: function (sess) {
                //     console.log("genid done!!!")
                //     return base64.encode(new Date().getTime()+ Math.random());
                //     // return buildSessionId(req);
                // },
            };
            app.use(session({
                resave: false, //添加 resave 选项
                saveUninitialized: true, //添加
                name: _config2.default.session.sessionCookieName,
                secret: _config2.default.session.sessionSecret,
                cookie: {
                    maxAge: _config2.default.session.sessionLifeTime
                },
                store: new MySQLStore(_options)
            }));
        }break;
    //其他待扩展...
    default:
        break;
}
//////////////////////////////////////////////init session end/////////////////////////////////////////////////////
//     next();
// });
// 初始化应用
var InitApp = function InitApp() {
    //设置跨域访问
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    var _loop = function _loop(i) {
        if (!/^\/[a-zA-Z0-9]{1,}|\*$/.test(_router2.default[i].path)) {
            console.log("第" + (parseInt(i) + 1) + "条路由'" + _router2.default[i].path + "'的路径有误");
            return "break";
        }
        if ("function" != typeof _router2.default[i].func) {
            console.log("第" + (parseInt(i) + 1) + "条路由'" + _router2.default[i].path + "'的回调函数有误！");
            return "break";
        }
        if (["all", "get", "post"].indexOf(_router2.default[i].type.toLocaleLowerCase()) < 0) {
            console.log("第" + (parseInt(i) + 1) + "条路由'" + _router2.default[i].path + "'的类型|type有误！");
            return "break";
        }
        switch (_router2.default[i].type.toLocaleLowerCase()) {
            case "all":
                {
                    app.all(_router2.default[i].path, function (req, res) {
                        return _router2.default[i].func(req, res);
                    });
                }
                break;
            case "get":
                {
                    app.get(_router2.default[i].path, function (req, res) {
                        return _router2.default[i].func(req, res);
                    });
                }
                break;
            case "post":
                {
                    app.post(_router2.default[i].path, function (req, res) {
                        return _router2.default[i].func(req, res);
                    });
                }
                break;
            default:
                break;
        }
    };

    for (var i in _router2.default) {
        var _ret = _loop(i);

        if (_ret === "break") break;
    }
    app.listen(_config2.default.port, function () {
        console.log("启动服务 http://" + new _server2.default().getIP() + ":9999 ");
    });
};

exports.default = InitApp;