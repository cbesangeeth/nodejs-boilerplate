const usersModel = require('../models').users;

exports.listUsers = async () =>
  usersModel.findAll({
    raw: true,
  });
