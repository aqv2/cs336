/* A person object prototype definition
 * By: Alastair Van Maren (aqv2)
 * Date: 09/12/2018
 */

//BEGIN: exercise 2.1

// Note: bdate must be passed as a string in YYYY-MM-DD format
function Person(name, bdate) {
  this.name = name;
  this.bdate = new Date(bdate);
  this.friends = [];
}

//This is a prototype definition of a function that returns a given person's age
// Used the code here as a template: http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.getAge = function() {
  var today = new Date();
  var age = today.getFullYear() - this.bdate.getFullYear();
  var m = today.getMonth() - this.bdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < this.bdate.getDate())) {
      age--;
  }
  return age;
}

//This prototype function adds a friend to the friends list
Person.prototype.addFriend = function(friendName) {
  this.friends.push(friendName);
}

Person.prototype.sayHello = function() {
  console.log("Hello, my name is " + this.name + ", I'm a person!")
}

var testPerson = new Person("Keith Vander Linden", "1961-09-12");
testPerson.addFriend("Alastair Van Maren");
testPerson.addFriend("Michel Momeijer");

console.log(testPerson);
console.log(testPerson.getAge());
console.log(testPerson.sayHello());

//END Exercise 2.1
//BEGIN Excercise 2.2
function Student(name, birthdate, subject) {
  Person.call(this, name, birthdate);
  this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.sayHello = function() {
  console.log("Hello, my name is " + this.name + ", I'm a student!")
}

var testStudent = new Student("Alastair Van Maren", "1996-01-12", "CS/Philosophy");

testStudent.addFriend("Keith Vander Linden");
console.log(testStudent);
testStudent.sayHello();

console.log(testStudent instanceof Person);
