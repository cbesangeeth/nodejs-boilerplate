const userRepo = require('../repo/user.repo');
const errorCode = require('../common/errorCode');
const { validateGetUsersList } = require('../validation/user.validation');
const responseHandler = require('../common/success.handler');
const { sendErrorResponse } = require('../common/error.handler');

exports.getUsers = async (req, res, next) => {
  try {
    // validation
    const errors = validateGetUsersList(req);

    // throw 400 error
    if (errors.length) {
      const errObj = {
        statusCode: 400,
        code: errorCode.BAD_REQUEST,
        message: 'Invalid input',
        details: errors,
      };

      return sendErrorResponse(errObj, res);
    }

    // repo call
    const usersData = await userRepo.listUsers();

    // return
    const resObj = {
      statusCode: 200,
      body: {
        usersData,
      },
    };

    return responseHandler.sendSuccessResponse(resObj, res);
  } catch (err) {
    return next(err);
  }
};
