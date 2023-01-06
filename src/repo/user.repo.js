const usersModel = require("../models").users;

exports.listUsers = async () => {
  return usersModel.findAll({
    raw: true,
  });
};
