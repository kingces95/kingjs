'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');
var clone = testRequire('@kingjs/descriptor.object.clone');

function readMe() {
  function invoke(value, key) {
    return value + 1;
  }
  
  var descriptor = {
    foo: 0,
    bar: 1,
  }
  
  var result = update.call(descriptor, invoke);
  assert(result.foo == 1);
  assert(result.bar == 2);
}
readMe();

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => update.call(thawed));
}
precondition();

require('./theory');