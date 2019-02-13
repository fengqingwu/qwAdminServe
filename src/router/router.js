import {
    writeRouter,
    writeMenu,
    writeRouteLink,
    getMenu
} from "../controller/vueApp.js"
import { 
    login,
    checkUser
 } from "../controller/user.js";
import { ajaxReturn } from "../utils/returnFomat.js";
//  import {
//     favicon
// } from "../controller/favicon.js"
// import {index} from "../controller/index.js"
import { test } from "../controller/test.js"
import {
    baseSettingApi,
    getBaseSettingApi,
    getSkinSetting,
    setSkinSetting
} from "../controller/appSetting.js"

export default [
    // {
    //     type:"get",
    //     path:"/favicon.ico",
    //     func:favicon
    // },
    {
        type:"get",
        path:"/test",
        func: test
    },
    {
        type:"post",
        path:"/writeRoute",
        func: writeRouter
    },{
        type:"post",
        path: "/writeMenu",
        func: writeMenu
    },
    {
        type: "post",
        path: "/writeRouteLink",
        func: writeRouteLink
    },
    {
        type: "post",
        path: "/getMenu",
        func: getMenu
    },
    {
        type: "post",
        path: "/login",
        func: login
    },
    {
        type: "post",
        path: "/baseSettingApi",
        func: baseSettingApi
    },
    {
        type: "post",
        path: "/getBaseSettingApi",
        func: getBaseSettingApi
    },{
        type: "post",
        path: "/getSkinSetting",
        func: getSkinSetting
    }, {
        type: "post",
        path: "/setSkinSetting",
        func: setSkinSetting
    },
    {
        type: "post",
        path: "/checkUser",
        func: checkUser
    },
    {
        type: "get",
        path: "/logout",
        func: (req, res) => {
            req.session.user = null;
            res.header('Content-Type', 'text/html');
            res.render('logout.ejs', { title: '用户退出 - 页面跳转', msg: "用户已退出", href: "/index.html", timeout: 5 });
        }
    },
    {   //404页面
        type: "get",
        path: "*",
        func: (req, res) => {
            res.header('Content-Type', 'text/html');
            res.render('404.ejs', { title: '页面不存在 - 404', timeout: 5 });
        }
    },
    {
        type: "post",
        path: "*",
        func: (req,res)=>{
            ajaxReturn(res,"非法的访问路径",{},405);
        }
    }
]