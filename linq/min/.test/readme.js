require('kingjs');
var min = require('..');
var assert = require('assert');

function readme() {
  assert(min.call([1, 2, 3]) == 1);
}
readme();

function readmePredicate() {
  var compareAge = function(l, r) {
     return l.age < r.age; 
  }
  
  var person = min.call(sequence(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 18 },
    { name: 'Chris', age: 19 },
  ), compareAge);

  assert(person.name == 'Alice');
  assert(person.age == 18);
}
readmePredicate();
