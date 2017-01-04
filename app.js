'use strict';
process.env.NODE_ENV = 'local';
let logger = require('./src/api/service/logger');
let Server = require('./src/api/server');
let API = new Server();

API.start((err) => {
  console.log('To stop the API server press CTRL^C...');
});

process.on('SIGINT', function () {
  API.stop(function stopAPISuccess() {
    console.log(' API stopped successfully...');
    logger.info('API stopped successfully...');
    process.exit();
  });
});
