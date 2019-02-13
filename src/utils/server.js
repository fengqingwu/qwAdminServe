
const path = require('path')
import qwFile from "./file.js"
import config from "../config/config.js"

class qwServer{
    constructor(){
        this.rootPath = path.resolve(__dirname,"../../src");
    }
    getIP() {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
    getConfig(){
        return config;
        // return new Promise((resolve,reject)=>{
        //     let f = new qwFile();
        //     f.read(this.rootPath + "/config/config.js").then(data => {
        //         resolve(data)
        //     }).catch(err=>{
        //         reject(err);
        //     })
        // })
        
    }

}
export default qwServer;