import qwFile from "../utils/file.js"
import path from "path"
// import config  from "../config/config.js"
export const index=(req,res)=>{
    // res.send(config.rootPath);
    // return;
    let f = new qwFile();
    let viewPath = path.resolve(__dirname,"../view");
    res.header("Content-Type", "text/html;charset=utf-8");
    f.isHas(viewPath+"/index.html").then(()=>{
        f.read(viewPath + "/index.html").then(data => {
            res.send(data);
        })
    }).catch(()=>{
        res.send("模板“/view/index.html”不存在！")
    })
}
