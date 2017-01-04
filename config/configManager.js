'use strict';
let configManager = require('node-config-manager');
let options = {
  configDir: 'config',
  env: process.env.NODE_ENV === undefined ? "local" : process.env.NODE_ENV,
  camelCase: true
};

configManager.init(options);
configManager.addConfig('logger');
configManager.addConfig('app');
module.exports = configManager;
