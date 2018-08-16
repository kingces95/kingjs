var min = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');

function readme() {
  assert(min.call(sequence(1, 2, 3)) == 1);
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
