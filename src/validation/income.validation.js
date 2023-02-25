const Joi = require('@hapi/joi');
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
