require('kingjs');
var Take = require('..');
var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var result = [-2, -1, 0, 1, 2][Take](2);
  var array = result[ToArray]();

  assert(array.length == 2);
  assert(array[0] == -2);
  assert(array[1] == -1);
}
readme();