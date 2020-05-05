require('kingjs');
var assert = require('assert');
var ThenByDescending = require('..');
var OrderByDescending = require('@kingjs/linq.order-by-descending');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  
  var people = [
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ];
  
  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }
  
  var sortedSequence = people[OrderByDescending](lastSelector);
  sortedSequence = sortedSequence[ThenByDescending](firstSelector);
 
  var sortedArray = sortedSequence[ToArray]();
  assert(sortedArray[2].last == 'King');
  assert(sortedArray[2].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[0].last == 'Smith');
  assert(sortedArray[0].first == 'Bob');
}
readme();
