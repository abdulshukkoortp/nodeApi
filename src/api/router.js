'use strict';
let controller = require('./controller');
class Router {
  apply(expressApp) {
    expressApp.get('/', (request, response) => {
      controller.status(request, response);
    });
  }
}
module.exports=Router;
