/* Made numerous changes to the original to get this to work, most notably smoothing out
 * how the "people" work using O.O. paradigms.
 */

//this global variable keeps track of the last ID used
var uniqueID = 0;

//People list for storing Person(s)
var peopleList = [];

//Get a unique ID (used for person creation)
function getUniqueID(){
	uniqueID++;
	return uniqueID;
}

//Defining our People objects
function Person(firstName, lastName, startDate) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.id = getUniqueID();
	this.startDate = startDate;
}

//taken from http://jsfiddle.net/codeandcloud/n33RJ/
function calcAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

//Adding our people to the list
peopleList.push(new Person('Keith', 'Vander Linden', "1996"));
peopleList.push(new Person('Patrick', 'Bailey', "2004"));
peopleList.push(new Person('Joel', 'Adams', '1989'));
peopleList.push(new Person('Victor', 'Norman', '2009'));
peopleList.push(new Person('Harry', 'Plantinga', '1990'));
peopleList.push(new Person('Derek', 'Schuurman', '2017'));

//#justserverthings
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http_status = require('http-status-codes');
var MongoClient = require('mongodb').MongoClient;

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//URL used to list all people objects as json object
app.get('/people', function(req, res) {
  var data = db.collection('people');
  data.find({}).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.post('/people', function(req, res) {
  // NOTE: In a real implementation, we would likely rely on a database or
  // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
  // treat Date.now() as unique-enough for our purposes.
  var people = db.collection('people');
	var today = new Date();
  people.insertOne({id: Date.now(), firstName: req.body.firstName, lastName: req.body.lastName, startDate: today.getFullYear()}, function(err,r) {
		res.json({firstName: req.body.firstName, lastName: req.body.lastName});
  });
});

//URL used to list record of a person with a given ID number
app.get('/person/:id', function(req,res){
	var people = db.collection('people');
	people.find({id: req.body.id}).toArray(function(err, r) {
		res.json(r);
	})
});

//URL used to edit info of person with given ID
app.put('/person/:id', function(req, res){
	var people = db.collection('people');
	people.findOneAndUpdate({id: req.body.id},
		{$set: {firstName: req.body.firstName, lastName: req.body.lastName, startDate: req.body.startDate}},
			{returnOriginal: false, upsert: true}).toArray(function(err, r) {
		res.json(r);
	})
});

//URL used to delete person with given ID
app.delete('/person/:id', function(req, res){
	var people = db.collection('people');
	people.deleteOne({id: req.body.id}).toArray(function(err, r) {
		res.sendStatus(200);
	})
});

//URL used to return the seniority of a person of given ID
app.get('/person/:id/years', function(req,res){
	var people = db.collection('people');
	people.find({id: req.body.id}).toArray(function(err, r) {
		var age = calcAge(r.startDate);
		res.json(age);
	})
});

//URL used to get the full name of person of a given ID and first name
app.get('/person/:id/name', function(req,res){
	var people = db.collection('people');
	people.find({id: req.body.id}).toArray(function(err, r) {
		fullName = r.firstName + " " + r.lastName;
		res.json(fullName);
	})
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds155313.mlab.com:55313/cs336', function (err, client) {
  if (err) throw err;
  db = client;
  app.listen(app.get('port'), function() {
      console.log('Server started: http://localhost:' + app.get('port') + '/');
  });
})
