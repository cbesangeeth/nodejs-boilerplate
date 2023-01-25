module.exports = app => {
  const BASE_PATH = `api`;

  app.use(`/${BASE_PATH}/users`, require('./v1/user.controller'));
};
