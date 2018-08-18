var intersect = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var toArray = testRequire('@kingjs/linq.to-array');
var assert = testRequire('@kingjs/assert');

function readme() {
  var result = intersect.call(
    sequence(0, 0, 1, 2),
    sequence(1, 0)
  )
  
  var result = toArray.call(result);

  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 1);
}
readme();

function readmeFlipped() {
  var result = intersect.call(
    sequence(1, 0),
    sequence(0, 0, 1, 2)
  )
  
  var result = toArray.call(result);

  assert(result.length == 2);
  assert(result[1] == 0);
  assert(result[0] == 1);
}
readmeFlipped();