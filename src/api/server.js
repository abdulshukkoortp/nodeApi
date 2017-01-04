'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let Router = require('./router');
let logger = require('./service/logger');
let mysql = require('mysql');
let bunyan = require('bunyan');
let controller = require('./controller');
let configManager = require('../../config/configManager');
let appCfg = configManager.getConfig('app');
class Server {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.serverInstance = null;
    this.dbInstance = null;
    this.port = 9000;
  }
  initRoutes() {
    let router = new Router();
    router.apply(this.app);
    return this;
  }
  listen(port) {
    this.port = port ? port : this.port;
    this.serverInstance = this.app.listen(this.port);
    logger.info(`API server is listening on port ${this.port}`);
    console.log(`API server is listening on port ${this.port}`);
    console.log(`http://localhost:${this.port}/`);
    return this;
  }
  start(done) {
    this.initRoutes();
    this.connectToDb();
    this.listen(appCfg.server.port);
    done();
  }
  stop(done) {
    if (this.dbInstance) {
      logger.info('Disconnecting from DB ...');
      this.dbInstance.end();
    }
    logger.info('Shutting down API server...');
    this.serverInstance.close();
    done();
  }
  connectToDb() {
    this.dbInstance = mysql.createConnection(appCfg.db);
    logger.info(`Connecting to DB..`);
    this.dbInstance.connect();
    controller.db = this.dbInstance;
  }
}
module.exports = Server;
