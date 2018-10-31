'use strict';

var reduce = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

var toArrayReduction = (a, o) => {
  if (!a) a = [];
  a.push(o); 
  return a 
};

function readMe() {
  var result = reduce([
    'a', [
      'b', [
        'c'
      ], 'd'
    ], 'e'
  ], toArrayReduction);

  assert(result.length == 5);
  assert(result[0] == 'a');
  assert(result[1] == 'b');
  assert(result[2] == 'c');
  assert(result[3] == 'd');
  assert(result[4] == 'e');
}
readMe();

function undefTest() {
  var result = reduce([
  ], toArrayReduction);

  assert(result === undefined);
}
undefTest();

function nullTest() {
  var result = reduce([
    null
  ], toArrayReduction);

  assert(result.length == 1);
  assert(result[0] == null);
}
nullTest();