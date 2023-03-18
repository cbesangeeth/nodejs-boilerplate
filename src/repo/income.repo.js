const incomeModel = require('../models').income;

exports.getAllIncome = async () =>
  incomeModel.findAll({
    raw: true,
  });

exports.getIncomeById = async incomeId =>
  incomeModel.findOne({
    where: {
      id: incomeId,
    },
  });

exports.addIncome = async payload => {
  const result = await incomeModel.create(payload);
  return result;
};

exports.editIncome = async (payload, incomeId) => {
  const result = await incomeModel.update(payload, {
    where: {
      id: incomeId,
    },
  });

  return result;
};
