const { RateLimiterMemory } = require('rate-limiter-flexible');
const { Logger } = require('../common/winston');

const log = new Logger(__filename);

const opts = {
  points: 20, // Each request consumes 1 point.
  duration: 1,
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddlewareInMemory = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(err => {
      log.error(`ERROR: Too many request coming in from IP: ${req.ip}`);
      log.error(err);
      return res.status(429).send('Too Many Requests');
    });
};

module.exports = { rateLimiterMiddlewareInMemory };
