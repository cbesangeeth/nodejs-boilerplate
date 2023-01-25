const jwt = require('jsonwebtoken');
const config = require('../config');
const errorCode = require('../common/errorCode');

const secretKey = config.jwt.accessKey;
const { Logger } = require('../common/winston');

const log = new Logger(__filename);

exports.authMiddleware = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // const userSessionToken = await getUserTokenDetails(req);

    // if (!userSessionToken) {
    //   res.api.success = false;
    //   res.api.error.message = "Invalid Session";
    //   res.api.error.code = "UNAUTHORIZED";
    //   res.api.error.details = [];
    //   res.api.statusCode = 401;
    //   res.status(res.api.statusCode);
    //   log.error(`In authMiddleware,Invalid Session`, req);
    //   return res.json(res.api);
    // }

    jwt.verify(authHeader, secretKey, (err, requestMeta) => {
      req.headers.requestMeta = requestMeta;
      if (err) {
        res.api.success = false;
        res.api.error.message =
          err.name === 'TokenExpiredError'
            ? 'Your session has expired. Please login again'
            : 'Token is not valid';
        res.api.error.code =
          err.name === 'TokenExpiredError'
            ? errorCode.SESSION_EXPIRED
            : errorCode.UNAUTHORIZED;
        res.api.error.details = [];
        res.api.statusCode = 403;
        res.status(res.api.statusCode);
        log.error(`In authMiddleware,Token is not valid`, req);
        return res.json(res.api);
      }

    });
  } else {
    res.api.success = false;
    res.api.error.message = 'Auth token is not supplied';
    res.api.error.code = 'UNAUTHORIZED';
    res.api.error.details = [];
    res.api.statusCode = 401;
    res.status(res.api.statusCode);
    log.error(`In authMiddleware,Auth token is not supplied`, req);
    return res.json(res.api);
  }
};
