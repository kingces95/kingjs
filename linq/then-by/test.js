var thenBy = require('.');
var testRequire = require('..');
var orderBy = testRequire('@kingjs/linq.order-by');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');
var sequence = testRequire('@kingjs/enumerable.create');

function readme() {
  
  var people = sequence(
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  );
  
  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }
  
  var sortedSequence = orderBy.call(people, lastSelector);
  sortedSequence = thenBy.call(sortedSequence, firstSelector);
 
  var sortedArray = toArray.call(sortedSequence);
  assert(sortedArray[0].last == 'King');
  assert(sortedArray[0].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[2].last == 'Smith');
  assert(sortedArray[2].first == 'Bob');
}
readme();
