const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {

  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.Crypto + req.body.Fiat, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;
    res.send("<h1>The current price of " +
      req.body.Crypto + " is " + price + " in " +
      req.body.Fiat + ". </h1>");
  });

});
app.listen(3000, function() {
  console.log("server running on port 3000");
});
