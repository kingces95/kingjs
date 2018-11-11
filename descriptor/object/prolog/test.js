'use strict';

var prolog = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var clone = testRequire('@kingjs/descriptor.object.clone');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

function readMe() {
  var descriptor = { };
  assert(isFrozen.call(descriptor));
  assert(descriptor == prolog.call(descriptor));

  descriptor = clone.call(descriptor);
  assert(!isFrozen.call(descriptor));
  assertThrows(() => prolog.call(descriptor));
}
readMe();