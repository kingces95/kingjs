var toArray = require('./index');
var sequence = require('@kingjs/sequence');
var assert = require('@kingjs/assert');

function readme() {
  var array = toArray.call(sequence(1, 2, 3));

  assert(array.length = 3);
  assert(array[0] == 1);
  assert(array[1] == 2);
  assert(array[2] == 3);
}
readme();
