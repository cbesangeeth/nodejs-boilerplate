const incomeModel = require('../models').income;

exports.getAllIncome = async () =>
  incomeModel.findAll({
    raw: true,
  });

exports.addIncome = async payload => {
  const result = await incomeModel.create(payload);
  return result;
};
