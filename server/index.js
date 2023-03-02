var express = require("express");
var app = express();
var http = require("http").createServer(app);

app.listen(3000, function (err, res) {
  console.log(`App listening in Port 3000`);
});

module.exports = app;
