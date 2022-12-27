'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const user = require('./user')(sequelize, Sequelize.DataTypes);
const allcode = require('./allcode')(sequelize, Sequelize.DataTypes);
const booking = require('./booking')(sequelize, Sequelize.DataTypes);
const clinic = require('./clinic')(sequelize, Sequelize.DataTypes);
const doctorInfo = require('./doctorInfo')(sequelize, Sequelize.DataTypes);
const examination = require('./examination')(sequelize, Sequelize.DataTypes);
const markdown = require('./markdown')(sequelize, Sequelize.DataTypes);
const position = require('./position')(sequelize, Sequelize.DataTypes);
const posts = require('./posts')(sequelize, Sequelize.DataTypes);
const schedule = require('./schedule')(sequelize, Sequelize.DataTypes);
const specialty = require('./specialty')(sequelize, Sequelize.DataTypes);
db[user.name] = user;
db[allcode.name] = allcode;
db[booking.name] = booking;
db[clinic.name] = clinic;
db[doctorInfo.name] = doctorInfo;
db[examination.name] = examination;
db[markdown.name] = markdown;
db[position.name] = position;
db[posts.name] = posts;
db[schedule.name] = schedule;
db[specialty.name] = specialty;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
