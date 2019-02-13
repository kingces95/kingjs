require('kingjs');
var where = require('..');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var numbers = sequence(0, 1, 2, 3);

  var isEven = function (x) { return x % 2 == 0; }

  var evenNumbers = where.call(numbers, isEven);

  var result = toArray.call(evenNumbers);
  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 2);
}
readme();

function readmeIndex() {
  var letters = sequence('a', 'b', 'c', 'd');

  var isEvenIndex = function (x, i) { return i % 2 == 0; }
  
  var everyOther = where.call(letters, isEvenIndex);
  
  var result = toArray.call(everyOther);
  assert(result.length == 2);
  assert(result[0] == 'a');
  assert(result[1] == 'c');
}
readmeIndex();