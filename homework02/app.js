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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//URL used to list all people objects as json object
app.get('/people', function (req, res) {
	res.json(peopleList);
});

//URL used to create new person
app.post('/people', function (req, res) {
	peopleList.push(new Person(req.body.firstName, req.body.lastName, req.body.startdate));
	res.json(peopleList[peopleList.length-1]);
});

//URL used to list record of a person with a given ID number
app.get('/person/:id', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(peopleList[i]);
			return;
		}
	}
	res.sendStatus(404);
});

//URL used to edit info of person with given ID
app.put('/person/:id', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			peopleList[i].firstName=req.body.firstName;
			peopleList[i].lastName=req.body.lastName;
			peopleList[i].startDate=req.body.startDate;
			res.json(peopleList[i]);
			return;
		}
	}
	res.sendStatus(404);
});

//URL used to delete person with given ID
app.delete('/person/:id', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			peopleList.splice(i,i+1);
			res.send("Person deleted...permanently.");
			return;
		}
	}
	res.sendStatus(404);
});

//URL used to return the seniority of a person of given ID
app.get('/person/:id/years', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(calcAge(peopleList[i].startDate));
			return;
		}
	}
	res.sendStatus(404);
});

//URL used to get the full name of person of a given ID and first name
app.get('/person/:id/name', function(req,res){
	for (var i = peopleList.length - 1; i >= 0; i--) {
		if (peopleList[i].id == req.params.id) {
			res.json(peopleList[i].firstName + ' ' + peopleList[i].lastName);
			return;
		}
	}
	res.sendStatus(404);
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

app.listen(3000, function (){
	console.log('listening in port 3000')
});
