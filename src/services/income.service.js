const incomeRepo = require('../repo/income.repo');
const errorCode = require('../common/errorCode');
const {
  validateAddIncome,
  validateEditIncome,
} = require('../validation/income.validation');
const { sendSuccessResponse } = require('../common/success.handler');
const { sendErrorResponse } = require('../common/error.handler');

exports.addIncome = async (req, res, next) => {
  try {
    // validation
    const error = await validateAddIncome(req.body);

    // throw 400 error
    if (error.details.length) {
      const errObj = {
        statusCode: 400,
        code: errorCode.BAD_REQUEST,
        message: 'Invalid input',
        details: error,
      };

      return sendErrorResponse(errObj, res);
    }

    // repo call
    const incomeResult = await incomeRepo.addIncome(req.body);

    // return
    const resObj = {
      statusCode: 200,
      body: {
        income: incomeResult,
      },
    };

    return sendSuccessResponse(resObj, res);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.editIncome = async (req, res, next) => {
  try {
    const { incomeId } = req.params;
    // validation
    const error = await validateEditIncome(req.body, incomeId);

    // throw 400 error
    if (error.details.length > 0) {
      // const errObj = {
      //   statusCode: errorCode.BAD_REQUEST,
      //   code: errorCode.BAD_REQUEST,
      //   message: 'Invalid input',
      //   details: error,
      // };

      return sendErrorResponse(error, res);
    }

    // repo call
    await incomeRepo.editIncome(req.body, incomeId);

    // fetch the updated record
    const updateResult = await incomeRepo.getIncomeById(incomeId);

    // return
    const resObj = {
      statusCode: 200,
      body: {
        income: updateResult,
      },
    };

    return sendSuccessResponse(resObj, res);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
