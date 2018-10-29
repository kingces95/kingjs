'use strict';

var toArray = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var result = toArray([
    'a', [
      'b', [
        'c'
      ], 'd'
    ], 'e'
  ]);

  assert(result.length == 5);
  assert(result[0] == 'a');
  assert(result[1] == 'b');
  assert(result[2] == 'c');
  assert(result[3] == 'd');
  assert(result[4] == 'e');
}
readMe();