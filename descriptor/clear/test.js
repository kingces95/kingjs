'use strict';

var clear = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  var descriptor = { x:0 };
  clear.call(descriptor, 'x');
  assert('x' in descriptor == false);
}
readMe();

function popArray() {
  var descriptor = [ 0 ];
  var result = clear.call(descriptor, 0);
  assert(result == descriptor);
  assert(result.length == 0);
}
popArray();

function shiftArray() {
  var descriptor = [ 0, 1, 2 ];
  var result = clear.call(descriptor, 1);
  assert(result != descriptor);
  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 2);
}
shiftArray();

require('./theory');