var skip = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');

function readme() {
  var result = skip.call(sequence(-2, -1, 0, 1, 2), 2);
  var array = toArray.call(result);

  assert(array.length == 3);
  assert(array[0] == 0);
  assert(array[1] == 1);
  assert(array[2] == 2);
}
readme();