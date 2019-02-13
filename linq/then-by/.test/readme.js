require('kingjs');
var assert = require('assert');
var thenBy = require('..');
var orderBy = require('@kingjs/linq.order-by');
var toArray = require('@kingjs/linq.to-array');

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
