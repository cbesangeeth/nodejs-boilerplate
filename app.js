const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const config = require("./config")

async function init() {

  // to add unique-ids to requests
  // app.use(addReqId());

  // set config
  // app.set('config', config);

  //body parser middleware
  app.use(bodyParser.json({ limit: "1mb" }));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  // create response
app.use((req, res, next) =>{
  res.api = {
    'success': true,
    'error': {
      "code": "",
      "message": "",
      "details": [{
        "target": "",
        "message": ""
      }]
    },
    'data': {},
    'statusCode': 200
  };
  next();
});

  // Attach routes
  require("./src/controllers/routes")(app);

  app.listen(8008, 'localhost');
  console.log('running...')
  // app.listen(app.get('config').api.port, app.get('config').api.host);
}

// module.exports = app;
init().catch((err) => {
  console.error(err);
  process.exit(1);
});
