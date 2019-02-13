import config from "../config/config.js";
import qwFile from "../utils/file.js";
import querystring from "querystring";
import path from "path";
import fs from "fs"
/**
 * 写入路由
 * @param {request} req 
 * @param {resource} res 
 */
export const writeRouter = (req,res)=>{
    res.header("Content-Type", "application/json;charset=utf-8");
    let json = req.body;
    let f = new qwFile();
    if ("" == json.content || (undefined == json.content)) {
        return res.send({ result: false, message: "参数错误！", status: 200 });
    } else {
        let pathRoot = config.vueAppRootPath + "/src";
        /* 写入相关文件 */
        let vueFiles = JSON.parse(json.files);
        let len = vueFiles.length;
        let count = 0;
        f.read(config.rootPath + "/src/template/commonPage.vue").then(data => {
            for (let i in vueFiles) {
                f.isHas(pathRoot + vueFiles[i]).then(() => {
                    count++;
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '存在')
                }).catch(() => {
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '不存在')
                    // console.log("创建路径：" + path.dirname(pathRoot + vueFiles[i]));
                    fs.mkdir(path.dirname(pathRoot + vueFiles[i]), "0777", function () {
                        let data2 = data.replace(/\$\$\$\{\{pageName\}\}\$\$\$/, vueFiles[i].split("/")[2]);
                        f.write(pathRoot + vueFiles[i], data2).then(() => {
                            count++;
                            // console.log("file:" + (pathRoot + vueFiles[i]) + '写入成功！')
                        })
                    });
                })
            }
        })
        /* 写入路由文件 */
        var timer = setInterval(() => {
            if (count >= len) {
                clearInterval(timer);
                let pathRoute = pathRoot + "/router/router.js";
                f.write(pathRoute, json.content).then(() => {
                    console.log("返回数据")
                    return res.send({
                        result: true, message: "操作成功！", status: 200, model: {
                            path: pathRoute,
                            vueFiles: vueFiles
                        }
                    })
                }).catch(() => {
                    return res.send({ result: false, message: "数据写入失败！", status: 200 });
                })
            }
        }, 30);
    }
}
export const writeRouteLink = (req, res) => {
    res.header("Content-Type", "application/json;charset=utf-8");
    let json = req.body;

    let f = new qwFile();
    if ("" == json.content || (undefined == json.content)) {
        return res.send({ result: false, message: "参数错误！", status: 200 });
    } else {
        let pathRoot = config.vueAppRootPath + "/src";
        /* 写入相关文件 */
        let vueFiles = JSON.parse(json.files);
        let len = vueFiles.length;
        let count = 0;
        f.read(config.rootPath + "/src/template/commonPage.vue").then(data => {
            for (let i in vueFiles) {
                f.isHas(pathRoot + vueFiles[i]).then(() => {
                    count++;
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '存在')
                }).catch(() => {
                    // console.log("file:" + (pathRoot + vueFiles[i]) + '不存在')
                    // console.log("创建路径：" + path.dirname(pathRoot + vueFiles[i]));
                    fs.mkdir(path.dirname(pathRoot + vueFiles[i]), "0777", function () {
                        let data2 = data.replace(/\$\$\$\{\{pageName\}\}\$\$\$/, vueFiles[i].split("/")[2]);
                        f.write(pathRoot + vueFiles[i], data2).then(() => {
                            count++;
                            // console.log("file:" + (pathRoot + vueFiles[i]) + '写入成功！')
                        })
                    });
                })
            }
        })
        /* 写入路由文件 */
        var timer = setInterval(() => {
            if (count >= len) {
                clearInterval(timer);
                let pathRoute = pathRoot + "/router/router.js";
                f.write(pathRoute, json.content).then(() => {
                    let pathRouteLink = pathRoot + "/router/index.js";
                    let str = `import Vue from 'vue'
import Router from 'vue-router'
import defaultRouters  from "./default.js"
import debugRouters from "./debugRouter.js"
import router from './router.js';

/* 下面可以添加自定义页面 */

Vue.use(Router)
export default new Router({
	routes: [
		...defaultRouters,
		...debugRouters,
		...router

	]
})
`+ '';
                    f.write(pathRouteLink, str).then(result => {
                        // console.log("返回数据")
                        return res.send({
                            result: true, message: "操作成功！", status: 200, model: {
                                path: pathRoute,
                                vueFiles: vueFiles
                            }
                        })
                    })
                }).catch(() => {
                    return res.send({ result: false, message: "数据写入失败！", status: 200 });
                })
            }
        }, 30);
    }
}
/**
 * 写入菜单到index.html
 * @param {request} req 
 * @param {resource} res 
 */
export const writeMenu = (req,res)=>{
    res.header("Content-Type", "application/json;charset=utf-8");
    let json = req.body;
    if ("" == json.menus || (undefined == json.menus)) {
        return res.send({ result: false, message: "参数错误", status: 200 });
    } else {
        try { 
            let menus = JSON.parse(json.menus);
            if (menus.constructor === Array && (menus.length > 0)) {
                let f = new qwFile();
                f.read(config.vueAppRootPath + "/index.html").then(data => {
                    let data2 = data.replace(/app\-menu\s{0,}=\s{0,}\'[\s|0-9|a-z|A-Z|\"|\=|\,\:\W]{0,}\'{1}/, "app-menu='" + json.menus + "'")
                    f.write(config.vueAppRootPath + "/index.html", data2).then(() => {
                        return res.send({ result: true, message: "操作成功！", status: 200 });
                    }).catch(e => {
                        return res.send({ result: false, message: "文件写入失败！", status: 200 });
                    })

                }).catch(e => {
                    return res.send({ result: false, message: "文件读取失败！", status: 200 });
                })
            } else {
                return res.send({ result: false, message: "参数错误", status: 200 });
            }
        } catch (e) {
            return res.send({ result: false, message: "参数错误", status: 200 });
        }
    }
}
export const getMenu = (req, res)=>{
    let f = new qwFile();
    f.read(config.vueAppRootPath + "/index.html").then(data => {
        let arrMatch = data.match(/app\-menu\s{0,}=\s{0,}\'[\s|0-9|a-z|A-Z|\"|\=|\,\:\W]{0,}\'{1}/)
        if (arrMatch && arrMatch[0]) {
            arrMatch = arrMatch[0].replace(/app\-menu\s{0,}=\s{0,}\'/, "").replace(/\'$/, "")
            if (arrMatch) {
                return res.send({ result: true, match: arrMatch, message: "操作成功！", status: 200 });
            }else{
                return res.send({ result: true, match: '[]', message: "菜单为空！", status: 200 });
            }
        } else {
            return res.send({ result: false, message: "未抓取到菜单！", status: 200 });
        }
    }).catch(e => {
        return res.send({ result: false, message: "读取失败", status: 200 });
    })
}