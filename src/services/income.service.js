const incomeRepo = require('../repo/income.repo');
const errorCode = require('../common/errorCode');
const { validateAddIncome } = require('../validation/income.validation');
const responseHandler = require('../common/success.handler');
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
    console.log(req.body);

    const incomeResult = await incomeRepo.addIncome(req.body);

    // return
    const resObj = {
      statusCode: 200,
      body: {
        incomeResult,
      },
    };

    return responseHandler.sendSuccessResponse(resObj, res);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
