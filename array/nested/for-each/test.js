'use strict';

var forEach = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var result = [];
  
  forEach.call([
    'a', [
      'b', [
        'c'
      ], 'd'
    ], 'e'
  ], function(x) {
    result.push(x);
  });

  assert(result.length == 5);
  assert(result[0] == 'a');
  assert(result[1] == 'b');
  assert(result[2] == 'c');
  assert(result[3] == 'd');
  assert(result[4] == 'e');
}
readMe();

function arrayLike() {
  var arrayLike = {
    length: 0
  };

  var result = [];
  
  forEach.call(arrayLike, function(x) {
    result.push(x);
  });

  assert(result.length == 1);
  assert(result[0] == arrayLike);
}
arrayLike();