import path from "path";
const config = {
    port: 9999,                                                         //服务端口
    rootPath: path.resolve(__dirname, "../../"),                        //服务根目录
    vueAppRootPath: path.resolve(__dirname, "../../../../qwAdmin"),     //应用根目录 主要用于qwTemplate
    session: {                                                          //session相关
        sessionCookieName: "qwframe_sid",                               //session name 用于标识session的cookie名字
        sessionSecret: "jacktan",                                       //session 加密密钥
        sessinStoreType: "mysql",                                       //session 驱动类型 redis | mysql 请自行扩展其他如 memery 等 
        sessionLifeTime: 1000 * 60 * 60 * 24                            //session 有效期
    }
};
export default config; 