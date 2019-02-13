/**
 *  用于框架基本配置
 */
import { ajaxReturn } from "../utils/returnFomat.js"
import { valiate } from "../validate/base.js"
import {
    baseSettingApi_rules,
    baseSettingSkin_rules
} from "../validate/baseSetting.js"
import qwFile from "../utils/file.js"; 
import config from "../config/config.js";

/**
 * 设置首页基础配置
 * @param {request} req 
 * @param {response} res 
 */
export const baseSettingApi = function (req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    let params = req.body;
    var validate_res = valiate(params, baseSettingApi_rules)
    if (validate_res.result) {
        var f = new qwFile();
        f.read(config.vueAppRootPath + "/index.html").then(data => {
            data = data.replace(/app\-name\s{0,}\=\s{0,}\"(.*){0,}\"/, 'app-name = "' + params.appName + '"')
            data = data.replace(/company\-name\s{0,}\=\s{0,}\"(.*){0,}\"/, 'company-name = "' + params.companyName+'"')
            data = data.replace(/logout\-page\s{0,}\=\s{0,}\"(.*){0,}\"/, 'logout-page = "' + params.logoutUrl + '"')
            data = data.replace(/app\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'app-url = "' + params.appUrl + '"')
            data = data.replace(/upload\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'upload-url = "' + params.uploadUrl + '"')
            data = data.replace(/static\-url\s{0,}\=\s{0,}\"(.*){0,}\"/, 'static-url = "' + params.staticUrl + '"')
            data = data.replace(/app\-timeout\s{0,}\=\s{0,}\"(.*){0,}\"/, "app-timeout = \"" + params.timeoutNumber + '"')
            data = data.replace(/debug\s{0,}\=\s{0,}\"(.*){0,}\"/,'debug = "'+ params.debug +'"')
            f.write(config.vueAppRootPath + "/index.html",data).then(()=>{
                return res.send({ result: true, message: "操作成功！", status: 200 });
            }).catch(e=>{
                return res.send({ result: false, message: "文件写入失败！", status: 200 });
            })
        }).catch(e=>{
            ajaxReturn(res, "读取失败！", {}, 405);
        })
        // ajaxReturn(res, "操作成功！", validate_res, 200);
    }else{
        ajaxReturn(res, validate_res.errMsg, {}, 405);
    }
}
/**
 * 获取首页基础配置
 * @param {request} req 
 * @param {response} res 
 */
export const getBaseSettingApi = function (req,res) {
    res.header("Content-Type", "application/json;charset=utf-8");   
    var f = new qwFile(); 
    f.read(config.vueAppRootPath + "/index.html").then(data => {
        let data_ret ={};
        let temp;
        temp= {
            appName: data.match(/app\-name\s{0,}\=\s{0,}\"(.*){0,}\"/),
            companyName: data.match(/company\-name\s{0,}\=\s{0,}\"(.*){0,}\"/),
            logoutUrl: data.match(/logout\-page\s{0,}\=\s{0,}\"(.*){0,}\"/),
            appUrl: data.match(/app\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            uploadUrl: data.match(/upload\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            staticUrl: data.match(/static\-url\s{0,}\=\s{0,}\"(.*){0,}\"/),
            timeoutNumber: data.match(/app\-timeout\s{0,}\=\s{0,}\"(.*){0,}\"/),
            debug: data.match(/debug\s{0,}\=\s{0,}\"(.*){0,}\"/)
        }
        for(let attr in temp ){
            data_ret[attr]= temp[attr]? temp[attr][1] : "";
            if(attr=="debug"){
                data_ret[attr] = temp[attr][1].trim()=="true"? true : false
            }
        }
        ajaxReturn(res, "操作成功！", data_ret, 200);
    }).catch(e => {
        ajaxReturn(res, "读取失败！", {}, 405);
    })
}
/**
 * 获取皮肤设置
 * @param {request} req 
 * @param {response} res 
 */
export const getSkinSetting = function (req,res){
    res.header("Content-Type", "application/json;charset=utf-8");
    var f = new qwFile();
    f.read(config.vueAppRootPath + "/src/store/modules/skin.js").then(data => {
        let temp= {
            mainHColor: data.match(/\s{1,}mainHColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            mainMColor: data.match(/\s{1,}mainMColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            mainLColor: data.match(/\s{1,}mainLColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            logoBlockBg: data.match(/\s{1,}logoBlockBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            logoBlockStyle: data.match(/\s{1,}logoBlockStyle\s{0,}\:\s{0,}"(.{0,})\"/),
            topBlockBg: data.match(/\s{1,}topBlockBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            sideNavBg: data.match(/\s{1,}sideNavBg\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            sideNavColor: data.match(/\s{1,}sideNavColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),
            sideNavHeight: data.match(/\s{1,}sideNavHeight\s{0,}\:\s{0,}(\d{1,})\,/),
            sideNavActiveBgColor: data.match(/\s{1,}sideNavActiveBgColor\s{0,}\:\s{0,}\"(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\"\s{0,}\,/),

            isShowTop: data.match(/\s{1,}isShowTop\s{0,}\:\s{0,}(\"(true|false)\"|(true|false))\,/),
            topBoxStyle: data.match(/\s{1,}topBoxStyle\s{0,}\:\s{0,}\"(.{0,})\"/),
            sideBarBoxStyle: data.match(/\s{1,}sideBarBoxStyle\s{0,}\:\s{0,}"(.{0,})\"/),
            pagePad: data.match(/\s{1,}pagePad\s{0,}\:\s{0,}(\d{1,})\,/),
        }
        let data_ret ={};
        for (let attr in temp) {
            data_ret[attr] = temp[attr] ? temp[attr][1] : "";
            if (attr == "isShowTop") {
                data_ret[attr] = temp[attr][1].replace(/\"/g,"").toLowerCase() == "true" ? true : false
            } else if (/^\d{1,}$/.test(data_ret[attr])){
                data_ret[attr] = parseInt(data_ret[attr]);
            }
        }
        ajaxReturn(res, "操作成功！", data_ret, 200);
    }).catch(e => {
        ajaxReturn(res, "读取失败！", {}, 405);
    })
}

export const setSkinSetting = function (req, res) {
    res.header("Content-Type", "application/json;charset=utf-8");
    let fileName = config.vueAppRootPath + "/src/store/modules/skin.js";
    let params = req.body;
    if ("" != params.pagePad) params.pagePad = parseInt(params.pagePad);
    if ("" != params.sideNavHeight) params.sideNavHeight = parseInt(params.sideNavHeight);
    let validate_res = valiate(params,baseSettingSkin_rules);
    if(validate_res.result){
        const replaceFunc= (dataStr,key,params)=>{
            if(undefined == params[key]){
                return dataStr;
            }
            let exp = new RegExp("\\\s{1}" + key + "\\\s{0,}\:\\\s{0,}\\\"{0,}(.*){0,}\\\"{0,}\\\s{0,}\\\,");
            return /^\d{1,}$/.test(params[key]) ? dataStr.replace(exp, " " + key + " : " + params[key] + ',') : dataStr.replace(exp, " " + key + " : \"" + params[key] + '\",');
        }
        var f = new qwFile();
        f.read(fileName).then(data => {
            let keys = ["mainHColor", "mainMColor", "mainLColor", "logoBlockBg", "logoBlockStyle", "topBlockBg", "sideNavBg", "sideNavColor", "sideNavHeight", "sideNavActiveBgColor", "isShowTop", "topBoxStyle", "sideBarBoxStyle", "pagePad"];
            for(let attr in keys){
               data = replaceFunc(data,keys[attr],params);
            }
            f.write(fileName, data).then(() => {
                return res.send({ result: true, message: "操作成功！", status: 200 });
            }).catch(e => {
                return res.send({ result: false, message: "文件写入失败！", status: 200 });
            })
        }).catch(e => {
            ajaxReturn(res, "操作失败！请稍后重试！", {e:e}, 405);
        })
        // res.send(ajaxReturn(res, "test", params, 200));    
    } else {
        ajaxReturn(res, validate_res.errMsg, {}, 405);
    }
    // res.send(ajaxReturn(res,"test",params,200));    
}