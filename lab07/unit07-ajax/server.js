/**
 * This implements some examples using jQuery and AJAX.
 */

const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

});

app.get("/hello", function(req, res) {
  res.send({"name":"Hello, " + req.query.name});
});

app.get("/fetch", function(req, res) {
    res.send({"content" : "Did we mention that " + req.query.name + " is free!"});
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
