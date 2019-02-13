    /**
     * node js server created by 谭成才 qq 841196685 
     * 项目构建方法参考 https://blog.csdn.net/weixin_36897085/article/details/79154105
     * 2018/11/02
     */

    import express from 'express';

    import path from "path";
    const app = express()

    import qwServer from "./utils/server.js"
    import router from "./router/router.js"
    import config from "./config/config.js"


    var bodyParser = require('body-parser');
    app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
    app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
        extended: true
    }));

    app.set('views', path.join(__dirname, '/template'));
    // app.set('view engine', 'jade');
    var ejs = require('ejs');
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');

    //option.genid(res)
    app.use(express.static(path.join(__dirname, '../../static')))

    //////////////////////////////////////////////init session/////////////////////////////////////////////////////

    // init session
    const session = require('express-session');
    const base64 = require('./utils/base64.js');


    switch (config.session.sessinStoreType) {
        case "redis":
            {
                const redis = require('redis'),
                    client = redis.createClient({ password: config.redis.password }),//这里填写redis的密码
                    RedisStore = require('connect-redis')(session);
                client.on("error", function (err) {
                    console.log("redisClientError==> " + err);//用于提示错误信息
                });
                const options = {
                    port: config.redis.port,
                    host: config.redis.host,
                    client: client
                }
                //console.log("config.db====>", JSON.stringify(config.redis))
                app.use(session({
                    resave: false, //添加 resave 选项
                    saveUninitialized: true, //添加
                    name: config.session.sessionCookieName,
                    secret: config.session.sessionSecret,
                    cookie: {
                        maxAge: config.session.sessionLifeTime
                    },
                    // genid: function (sess) {
                    //     console.log("genid done!!!")
                    //     return base64.encode(new Date().getTime() + Math.random());
                    //     // return buildSessionId(req);
                    // },
                    store: new RedisStore(options),
                }));
            }
            break;
        case "mysql":
            {
                console.log("session mod mysql!!!!");
                const MySQLStore = require('express-mysql-session')(session);
                const options = {
                    host: config.db.host,
                    user: config.db.user,
                    password: config.db.password,
                    port: config.db.port,
                    database: config.db.database,
                    // genid: function (sess) {
                    //     console.log("genid done!!!")
                    //     return base64.encode(new Date().getTime()+ Math.random());
                    //     // return buildSessionId(req);
                    // },
                }
                app.use(session({
                    resave: false, //添加 resave 选项
                    saveUninitialized: true, //添加
                    name: config.session.sessionCookieName,
                    secret: config.session.sessionSecret,
                    cookie: {
                        maxAge: config.session.sessionLifeTime
                    },
                    store: new MySQLStore(options)
                }));
            } break;
        //其他待扩展...
        default:
            break;
    }
        //////////////////////////////////////////////init session end/////////////////////////////////////////////////////
//     next();
// });
// 初始化应用
let InitApp = function(){    
    //设置跨域访问
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    })
    for (let i in router) {
        if (!/^\/[a-zA-Z0-9]{1,}|\*$/.test(router[i].path)) {
            console.log("第" + (parseInt(i) + 1) + "条路由'" + router[i].path +"'的路径有误");
            break;
        }
        if ("function" != typeof (router[i].func)) {
            console.log("第" + (parseInt(i) + 1) + "条路由'" + router[i].path +"'的回调函数有误！");
            break;
        }
        if(["all","get","post"].indexOf(router[i].type.toLocaleLowerCase())<0){
            console.log("第" + (parseInt(i) + 1) + "条路由'" + router[i].path +"'的类型|type有误！");
            break;
        }
        switch (router[i].type.toLocaleLowerCase()){
            case "all":
                {
                    app.all(router[i].path, (req, res) => {
                        return router[i].func(req, res)
                    });
                }
                break;
            case "get":
                {
                    app.get(router[i].path, (req, res) => {
                        return router[i].func(req, res)
                    });
                }
                break;
            case "post":
                {
                    app.post(router[i].path, (req, res) => {
                        return router[i].func(req, res)
                    });
                }
                break;        
            default:
                break;
        } 
    }
    app.listen(config.port, function () {
        console.log("启动服务 http://" + new qwServer().getIP() + ":9999 ")
    })
}

export default InitApp;