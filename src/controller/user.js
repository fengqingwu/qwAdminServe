/* 用户处理 */
import { ajaxReturn } from "../utils/returnFomat.js";
import { valiate } from "../validate/base.js"
import { login_rules} from "../validate/user.js"
var UserModel = require('../model/user.js').User;
export const login =(req, res)=>{
    let params = req.body;
    var validate_res = valiate(params, login_rules)
    if(validate_res.result){
        UserModel.findOne({where:{
            count: params.userName,
            pass: params.userPass
        }}).then(data=>{
            req.session.user  = data;
            ajaxReturn(res,"success",{id: data.id,userName: data.count},200)
        }).catch(err=>{
            ajaxReturn(res,"用户名或密码错误",err,405);
        })
    } else ajaxReturn(res, validate_res.err_msg,params,405);
}
export const checkUser = ( req,res )=>{
    let params = req.body;
    var validate_res = valiate(params, checkUser_rules);
    if (validate_res.result){
        if (req.session.user && (req.session.user.count == params.userName)){
            ajaxReturn(res, "用户名未登录", {}, 300);
        }else{
            ajaxReturn(res, "success", {}, 300);
        }
    }else{
        ajaxReturn(res, validate_res.err_msg, params, 405);
    }
}