"use strict";

var _config = require("../config/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require("Sequelize");
var sequelize = new Sequelize(_config2.default.db.database, _config2.default.db.user, _config2.default.db.password, {
    host: _config2.default.db.host,
    port: _config2.default.db.port,
    dialect: 'mysql',
    timezone: "+08:00"
});
exports.sequelize = sequelize;