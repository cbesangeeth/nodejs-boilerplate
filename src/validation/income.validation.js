const Joi = require('@hapi/joi');
const incomeRepo = require('../repo/income.repo');
const errorCode = require('../common/errorCode');

exports.validateAddIncome = async body => {
  const errors = [];

  const errObj = {
    statusCode: 400,
    code: errorCode.BAD_REQUEST,
    message: 'Invalid input',
    details: errors,
  };

  const incomeSchema = Joi.object({
    amount: Joi.number().required(),
    description: Joi.string().optional(),
    userId: Joi.number().required(),
    transactionDate: Joi.date().required(),
    incomeType: Joi.number().optional(),
  }).options({
    abortEarly: false,
    allowUnknown: false,
  });

  const { error } = incomeSchema.validate(body);

  if (error) {
    error.details.forEach(errorArray => {
      const errDetails = {};
      errDetails.target = errorArray.context.label;
      errDetails.message = errorArray.message.replace(/"/g, "'");
      errObj.details.push(errDetails);
    });
  }

  return errObj;
};

exports.validateEditIncome = async (body, incomeId) => {
  const errors = [];

  const errObj = {
    statusCode: 400,
    code: errorCode.BAD_REQUEST,
    message: 'Invalid input',
    details: errors,
  };

  // fetch the updated record
  const updateResult = await incomeRepo.getIncomeById(incomeId);

  console.log(updateResult);
  if (!updateResult) {
    errObj.statusCode = errorCode.NOT_FOUND;
    errObj.details.push({
      target: 'incomeId',
      message: 'incomeId not found',
    });

    return errObj;
  }

  const incomeSchema = Joi.object({
    amount: Joi.number().required(),
    description: Joi.string().optional(),
    userId: Joi.number().required(),
    transactionDate: Joi.date().required(),
    incomeType: Joi.number().optional(),
  }).options({
    abortEarly: false,
    allowUnknown: false,
  });

  const { error } = incomeSchema.validate(body);

  if (error) {
    error.details.forEach(errorArray => {
      const errDetails = {};
      errDetails.target = errorArray.context.label;
      errDetails.message = errorArray.message.replace(/"/g, "'");
      errObj.details.push(errDetails);
    });
  }

  return errObj;
};
