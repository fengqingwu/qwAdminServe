
var Sequelize = require("sequelize");
var sequelize = require('../utils/sequelizeMysql.js').sequelize;

exports.User = sequelize.define('user',{
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: Sequelize.STRING },
    pass: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    sign: { type: Sequelize.STRING },
    avatar: { type: Sequelize.STRING },
    token: { type: Sequelize.STRING },
    intm: { type: Sequelize.INTEGER },
    uptm: { type: Sequelize.INTEGER }
},{
    freezeTableName: true,
    timestamps: false
});

/* sequelize */
// export const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         validate: {
//             isEmail: true
//         },
//         unique: true
//     }
// });

// exports.User = sequelize.define('user', {
//     id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: Sequelize.STRING },
//     pass: { type: Sequelize.STRING },
//     photo: { type: Sequelize.STRING },
//     intm: { type: Sequelize.INTEGER },
//     uptm: { type: Sequelize.INTEGER }
//     // number: { type: Sequelize.STRING },
//     // mobile: { type: Sequelize.STRING },
//     // email: { type: Sequelize.STRING },
//     // divisionId: { type: Sequelize.STRING },
//     // role: { type: Sequelize.INTEGER, defaultValue: 0 },
//     // creditPoint: { type: Sequelize.INTEGER, defaultValue: 100 }
// }, {
//         freezeTableName: true,
//         timestamps: false
//     });
