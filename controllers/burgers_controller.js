var express = require("express");

var router = express.Router();

// Import the model
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.all(function (result) {
    var hbsObject = {
      burger: result,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create(req.body, function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//api/burgers/:id  => :id is variable has the value 1
router.put("/api/burgers/:id", function (req, res) {
  var condition = { id: req.params.id };

  console.log("condition", condition);

  burger.update(req.body, condition, function (result) {
    res.json(result);
  });
});

router.delete("/api/burger/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
