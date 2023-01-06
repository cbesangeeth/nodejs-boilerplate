"use strict";

const _ = require("lodash"),
  config = {
    appName: "snapshot-notification-service",
    env: process.env.ENV || "dev",
    db: {},
  };
module.exports = _.assignIn(config, require(`./${config.env}`));
