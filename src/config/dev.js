module.exports = {
  api: {
    port: '8009',
    host: 'localhost',
  },
  db: {
    user: 'root',
    password: 'root',
    database: 'snapshot-notification',
    host: 'localhost',
    port: '3306',
    driver: 'mysql',
    dialect: 'mysql',
    multipleStatements: 'true',
  },
  log: {
    level: ['debug', 'info', 'error', 'warn'],
  },
  jwt: {
    accessKey: 'accesssecretkey',
    refreshKey: 'refreshsecretkey',
    accessKeyExpiresIn: '1d',
    refreshKeyExpiresIn: '1y',
  },
  pagination: {
    pageSize: 25,
    pageNumber: 1,
  },
};
