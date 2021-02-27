// Import MySQL connection.
var connection = require("../config/connection.js");

//  print Questions

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    //  skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function (table, reqBody, cb) {
    var statement = connection.query(
      "insert into ?? set ?",
      [table, reqBody],
      function (err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      }
    );

    console.log(statement.sql);
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, reqBody, condition, cb) {
    var statement = connection.query(
      `update ?? set ? where ? `,
      [table, reqBody, condition],
      function (err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      }
    );
    console.log(statement.sql);
  },
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;
