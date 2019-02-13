'use strict';

var write = require('.');

var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');
var clone = require('@kingjs/descriptor.object.clone');

function readMe() {
  var target = { foo: 0 };
  
  assert(isFrozen.call(target));
  var result = write.call(target, 'foo', 0);
  assert(result == target);
  assert(isFrozen.call(result));

  target = result;
  result = write.call(target, 'bar', 0);
  assert(result != target);
  assert(isFrozen.call(result));
  assert(result.foo == 0);
  assert(result.bar == 0);
  assert('bar' in target == false);
}
readMe();

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => scorch.call(thawed));
}
precondition();

require('./theory');