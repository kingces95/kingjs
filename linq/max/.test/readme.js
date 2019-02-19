require('kingjs');
var Max = require('..');
var assert = require('assert');

function readme() {
  assert([1, 2, 3][Max]() == 3);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  ][Max](compareAge);

  assert(person.name == 'Bob');
  assert(person.age == 19);
}
readmePredicate();
