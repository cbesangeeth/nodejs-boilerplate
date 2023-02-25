const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/index');
const { Logger } = require('../common/winston');

const log = new Logger(__filename);
const db = {};

try {
  const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db,
  );


  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => {
      let model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes,
      );
      if (config.db.schema && config.db.schema.length > 0) {
        model = model.schema(config.db.schema);
      }
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  sequelize
    .authenticate()
    .then(() => {
      log.info('Connection has been established successfully.');

      db.sequelize = sequelize;
    })
    .catch(error => {
      log.error('Unable to connect to the database: ', error);
      throw error;
    });
} catch (error) {
  console.log(`Connection to DB failed & error is :: ${error}`);
  throw error;
}

module.exports = db;
