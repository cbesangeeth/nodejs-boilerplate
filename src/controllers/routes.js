module.exports = app => {
  const BASE_PATH = `api`;

  app.use(`/${BASE_PATH}/users`, require('./v1/user.controller'));
  app.use(`/${BASE_PATH}/income`, require('./v1/income.controller'));
};
