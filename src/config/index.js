const _ = require('lodash');

const config = {
  appName: 'radical-service',
  env: process.env.ENV || 'dev',
  db: {},
};

module.exports = _.assignIn(config, require(`./${config.env}`));
