// ./. tells node not to look in the node_modules dir
var fortune = require("./lib/fortune.js");

// require: node function for importing a module
var express = require("express");
var app = express();

// static middleware
// errore: senza __dirname!
app.use(express.static("public"));

// set up handlebars view engine
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

// get: http methods
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/about", function (req, res) {
  //   var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: fortune.getFortune() });
});

// use: handling middlewares --> order of def routes is important!

// custom 404 page
// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});
// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
