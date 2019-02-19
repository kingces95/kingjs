require('kingjs');
var assert = require('assert');
var Prepend = require('..');
var SequenceEqual = require('@kingjs/linq.sequence-equal');
var ToArray = require('@kingjs/linq.to-array');

function readme() {
  var numbers = [1, 2, 3];
  var result = numbers[Prepend](0);
  var array = result[ToArray]();

  assert(
    [0, 1, 2, 3][SequenceEqual](array)
  );
}
readme();