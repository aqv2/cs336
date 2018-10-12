/* Name: Alastair Van Maren
   Class: CS 336
   Prof: people[0].firstName + people[0].lastName
   */

const express = require('express')
const http_status = require("http-status-codes")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}!`));

//creating our routes
app.get("/request", function (req, res) {
  res.status(http_status.OK);
  res.send("Yo, GET \n");
});

app.head("/request", function (req, res) {
  res.status(http_status.OK);
  res.send("Salutations, HEAD \n");
});

app.post("/request", function(req, res) {
  res.status(http_status.OK);
  res.setHeader('Content-Type', 'text/plain')
  res.write('Greetings, POST\n');
  res.end(JSON.stringify(req.body, null, 2));
});

app.put("/request", function(req, res) {
  res.status(http_status.OK);
  res.setHeader('Content-Type', 'text/plain')
  res.write('Hi, PUT\n');
  res.end(JSON.stringify(req.body, null, 2));
});

app.delete("/request", function(req, res) {
  res.status(http_status.OK);
  res.send("'Sup', DELETE \n");
});

app.post("/form-handling-link", function(req, res) {
  res.status(http_status.OK);
  res.setHeader('Content-Type', 'text/plain')
  res.write('Greetings, form-POST\n');
  res.end(JSON.stringify(req.body, null, 2));
});

app.all("*", function (req, res) {
  res.sendStatus(http_status.NO_CONTENT);
});
