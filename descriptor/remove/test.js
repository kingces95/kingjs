'use strict';

var remove = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');
var clone = testRequire('@kingjs/descriptor.object.clone');

function readMe() {
  var descriptor = { x:0 };

  var result = remove.call(descriptor, 'x');
  assert(result != descriptor);

  assert('x' in descriptor);
  assert(isFrozen.call(result));

  assert('x' in result == false);
  assert(isFrozen.call(result));
}
readMe();

function cloneArray() {
  var descriptor = [ 0 ];

  var result = remove.call(descriptor, 0);
  assert(result != descriptor);

  assert('0' in descriptor);
  assert(isFrozen.call(descriptor));

  assert('0' in result == false);
  assert(isFrozen.call(result));
}
cloneArray();

function cloneAndShiftThenPopArray() {
  var descriptor = [ 0, 1, 2 ];

  var result = remove.call(descriptor, 1);
  assert('2' in descriptor);
  assert(isFrozen.call(descriptor));

  assert('2' in result == false);
  assert(isFrozen.call(result));

  assert(result.length == 2);
  assert(result[0] == 0);
  assert(result[1] == 2);

  var result0 = remove.call(result, 1);
  assert(result != result0);

  assert('1' in result);
  assert('1' in result0 == false);
  assert(isFrozen.call(result));

  assert(result0.length == 1);
  assert(result0[0] == 0);
}
cloneAndShiftThenPopArray();

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => remove.call(thawed));
}
precondition();

require('./theory');