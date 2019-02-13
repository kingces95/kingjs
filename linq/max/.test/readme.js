require('kingjs');
var max = require('..');
var assert = require('assert');

function readme() {
  assert(max.call([1, 2, 3]) == 3);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = max.call(sequence(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 19 },
  ), compareAge);

  assert(person.name == 'Bob');
  assert(person.age == 19);
}
readmePredicate();
