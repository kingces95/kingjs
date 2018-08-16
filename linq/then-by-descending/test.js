var thenByDescending = require('./index');
var orderByDescending = require('@kingjs/linq.order-by-descending');
var assert = require('@kingjs/assert');
var toArray = require('@kingjs/linq.to-array');
var sequence = require('@kingjs/sequence');

function readme() {
  
  var people = sequence(
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  );
  
  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }
  
  var sortedSequence = orderByDescending.call(people, lastSelector);
  sortedSequence = thenByDescending.call(sortedSequence, firstSelector);
 
  var sortedArray = toArray.call(sortedSequence);
  assert(sortedArray[2].last == 'King');
  assert(sortedArray[2].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[0].last == 'Smith');
  assert(sortedArray[0].first == 'Bob');
}
readme();
