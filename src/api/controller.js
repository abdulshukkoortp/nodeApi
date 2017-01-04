'use strict';
let controller = {
  db: null,
  status: function (request, response) {
    response.send({
      "status": "ok"
    });
  }
}
module.exports = controller;
