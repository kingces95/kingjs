'use strict';

var remove = require('.');

var assert = require('assert');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

function readMe() {
  var descriptor = { x:0, y:1};

  var result = remove.call(descriptor, 'x');
  assert(result != descriptor);

  assert('x' in descriptor);
  assert(isFrozen.call(descriptor));

  assert('x' in result == false);
  assert(!isFrozen.call(result));

  var result0 = remove.call(result, 'y');
  assert(result == result0);

  assert('y' in result == false);
  assert(!isFrozen.call(result));
}
readMe();

function cloneArray() {
  var descriptor = [ 0 ];

  var result = remove.call(descriptor, 0);
  assert(result != descriptor);

  assert('0' in descriptor);
  assert(isFrozen.call(descriptor));

  assert('0' in result == false);
  assert(!isFrozen.call(result));
}
cloneArray();

function cloneAndShiftThenPopArray() {
  var descriptor = [ 0, 1, 2 ];

  var result = remove.call(descriptor, 1);
  assert('2' in descriptor);
  assert(isFrozen.call(descriptor));

  assert('2' in result == false);
  assert(!isFrozen.call(result));

  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 2);

  var result0 = remove.call(result, 1);
  assert(result == result0);

  assert('1' in result == false);
  assert(!isFrozen.call(result));

  assert(result.length == 1);
  assert(result[0] == 0);
}
cloneAndShiftThenPopArray();

require('./theory');