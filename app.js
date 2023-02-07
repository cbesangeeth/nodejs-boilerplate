const express = require('express');
const bodyParser = require('body-parser');
const { Logger } = require('./src/common/winston');

const log = new Logger(__filename);
const config = require('./src/config');

const app = express();

async function init() {
  // set config
  app.set('config', config);

  // body parser middleware
  app.use(bodyParser.json({ limit: '1mb' }));

  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  // create response
  app.use((req, res, next) => {
    res.api = {
      success: true,
      error: {
        code: '',
        message: '',
        details: [
          {
            target: '',
            message: '',
          },
        ],
      },
      data: {},
      statusCode: 200,
    };
    next();
  });

  // Attach routes
  require('./src/controllers/routes')(app);

  log.info('running...');
  app.listen(app.get('config').api.port, app.get('config').api.host);
}

init().catch(err => {
  console.log(err);
  process.exit(1);
});
