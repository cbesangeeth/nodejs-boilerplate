const { Logger } = require('./winston');
const errorCode = require('./errorCode');

const log = new Logger(__filename);

exports.sendErrorResponse = (error, res) => {
  res.api.success = false;
  res.api.error.code = error.code;
  res.api.error.message = error.message;
  res.api.error.details = error.details;
  res.api.statusCode = error.statusCode;
  res.status(res.api.statusCode);

  res.json(res.api);
};

exports.InterserviceErrorResponse = (errorResponse, res) => {
  res.status(errorResponse.statusCode);
  res.json(errorResponse);
};

exports.sendForbiddenResponse = (res, req) => {
  res.api.success = false;
  res.api.error.message = 'Access Denied';
  res.api.error.code = errorCode.FORBIDDEN;
  res.api.error.details = [];
  res.api.statusCode = 403;
  res.status(res.api.statusCode);
  log.error(`In authMiddleware,User is not authorized`, req);

  return res.json(res.api);
};
