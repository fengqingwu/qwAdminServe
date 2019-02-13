import config from "../config/config.js";
// import qwMysql from "../module_ext/mysql/qwMysql.js";
// var mysql = require('mysql');
import { ajaxReturn,ajaxReturnGrid } from "../utils/returnFomat.js";
import qwCookieParser from "../utils/qwCookieParser.js";
// import qwCode from "../utils/encryptionAndDecryption.js"
import { User} from "../model/user.js"

export const test = (req, res) => {
    //====================================db test ====================================
    // let my = new qwMysql();
    // my.query('SELECT 1 + 1 AS solution').then(data=>{
    //     res.send({msg:"queryEnd",data:data});
    // }).catch(data=>{
    //     res.send({msg:"queryError",data:data});
    // })    
    //=======================================session test ===============================   
    // var user = {
    //     name: "Chen-xy",
    //     age: "22",
    //     address: "bj"
    // }
    // req.session.user = user;
    // res.send({"session_user": !req.session ? null : req.session.user });
    //======================================returnfomat test============================== 
    
    // let user = req.session.user;
    // let Cookies = qwCookieParser(req);
    // if(user){
    //     ajaxReturn(res, "操作成功！", { user: user, sid:Cookies[config.session.sessionCookieName]},200);
    // }else{
    //     ajaxReturn(res,"需要登录",null,320)
    // }    
    //======================================test sessionid build===========================
    // var base64 = require("../utils/base64.js");
    // var get_client_ip = function (req) {
    //     var ip = req.headers['x-forwarded-for'] ||
    //         req.ip ||
    //         req.connection.remoteAddress ||
    //         req.socket.remoteAddress ||
    //         req.connection.socket.remoteAddress || '';
    //     if (ip.split(',').length > 0) {
    //         ip = ip.split(',')[0]
    //     }
    //     return ip;
    // };
    // var genid = function (req) {
    //     let key = { ip: get_client_ip(req).replace("::ffff:",""), tm: new Date().getTime() };
    //     res.send({type: 'test', key: base64.encode(JSON.stringify(key))});

    // }
    // genid(req);
    //=======================================test 创建数据===================================================
    //用sequelize创建我们第一个用户
    User.create({
        name: 'jacktan',
        pass: '123456'
    }).done(function (err, result) {
        console.log(err)
        if(err){
            res.send({err:err,result:result});
        }else {
            res.send(result);
        }
        console.log(result)
    })
}