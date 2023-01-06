const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/index");

try {
  const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db
  );

  const db = {};

  fs.readdirSync(__dirname)
    .filter(function (file) {
      return file.indexOf(".") !== 0 && file !== "index.js";
    })
    .forEach(function (file) {
      let model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      if (config.db.schema && config.db.schema.length > 0) {
        model = model.schema(config.db.schema);
      }
      db[model.name] = model;
    });

  Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  module.exports = db;
  console.log(`Connection to DB success`);
} catch (error) {
  console.log(`Connection to DB failed & error is :: ${error}`);
}