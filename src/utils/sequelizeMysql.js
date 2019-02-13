import config from "../config/config.js"

var Sequelize = require("Sequelize");
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    timezone: "+08:00",
});
exports.sequelize = sequelize;