/* Name: Alastair Van Maren
   Class: CS 336
   Prof: people[0].firstName + people[0].lastName
   */

const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}!`));

var people = [
  {firstName:"Keith",lastName:"Vander Linden",id:"5267111",startDate:"1996"},
  {firstName:"Patrick",lastName:"Bailey",id:"5267543",startDate:"2004"},
  {firstName:"Joel",lastName:"Adams",id:"5268666",startDate:"1989"},
  {firstName:"Victor",lastName:"Norman",id:"5267805",startDate:"2009"},
  {firstName:"Harry",lastName:"Plantinga",id:"5266860",startDate:"1990"},
  {firstName:"Derek",lastName:"Schuurman",id:"5268562",startDate:"2017"}
];

//creating our routes
app.get("/people", function (req, res) {
  res.json(people);
});

app.get("/person/:id", function(req, res) {
  //looping over our array of json people objects
  for (var i = 0; i < people.length; i++) {
    //checking to see if they match
    if (req.params.id === people[i].id) {
      res.json(people[i]);
      break;
    }
  } try {
      res.sendStatus(404);
  } catch(err) {
    //Yay, we caught that error!
    }
});

app.get("/person/:id/name", function(req, res) {
  for (var i = 0; i < people.length; i++) {
    if (req.params.id === people[i].id) {
      name = people[i].firstName + " " + people[i].lastName;
      res.json(name);
      break;
    }
  } try {
      res.sendStatus(404);
  } catch(err) {
    //Yay, we caught the error!
    }
});

app.get("/person/:id/years", function(req, res) {
  for (var i = 0; i < people.length; i++) {
    if (req.params.id === people[i].id) {
      date =  new Date();
      years = (date.getFullYear() - parseInt(people[i].startDate));
      res.json(years);
      break;
    }
  } try {
      res.sendStatus(404);
  } catch(err) {
    //Yay, we caught the error!
    }

});

app.get("/*", function (req, res) {
  try {
     res.sendStatus(404);
 } catch(err) {
   //Yay, we caught the error!
  }
});
