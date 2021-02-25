var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Static content for public

app.use(express.static("public"));

//  Parse application body as JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import handlebars

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start server

app.listen(PORT, function () {
  console.log(" Server listening on: http://localhost:" + PORT);
});
