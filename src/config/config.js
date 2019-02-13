import appConfig from "./app.js"
import mysqlConfig from "./mysql.js"
import redis from "./redis.js"

let config ={};
var addConfig = function (data) {
    for (let attr in data) {
        config[attr] = data[attr];
    }
}
addConfig(appConfig);
addConfig(mysqlConfig);
addConfig(redis);

export default config;