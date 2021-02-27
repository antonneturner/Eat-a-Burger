// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function (cb) {
    orm.all("burgers", function (result) {
      cb(result);
    });
  },
  // The variables cols and vals are arrays.
  create: function (reqBody, cb) {
    orm.create("burgers", reqBody, function (res) {
      cb(res);
    });
  },
  update: function (reqBody, condition, cb) {
    orm.update("burgers", reqBody, condition, function (res) {
      cb(res);
    });
  },
  delete: function (condition, cb) {
    orm.delete("burgers", condition, function (res) {
      cb(res);
    });
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
