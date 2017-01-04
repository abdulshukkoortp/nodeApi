'use strict';
let bunyan = require('bunyan');
let configManager = require('../../../config/configManager');
let loggerCfg = configManager.getConfig('logger');


var logger = bunyan.createLogger({
  name: loggerCfg.name,
  streams: loggerCfg.streams,
  serializers: bunyan.stdSerializers,
  src: loggerCfg.src
});
module.exports = logger;
