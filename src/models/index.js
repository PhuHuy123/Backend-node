"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;
const customizeConfig={
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    query:{
      raw:true
    },  
    timezone: "+07:00",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
}[env]
//   host: process.env.DB_HOST,// dia chi server
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// }

// sequelize = new Sequelize(
//   process.env.DB_DATABASE_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   customizeConfig
//   );

if (customizeConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[customizeConfig.use_env_variable], customizeConfig);
} else {
  sequelize = new Sequelize(
    customizeConfig.database,
    customizeConfig.username,
    customizeConfig.password,
    customizeConfig
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
