require('kingjs');
var take = require('..');
var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var result = take.call(sequence(-2, -1, 0, 1, 2), 2);
  var array = toArray.call(result);

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();