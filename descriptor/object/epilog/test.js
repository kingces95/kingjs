'use strict';

var epilog = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var clone = testRequire('@kingjs/descriptor.object.clone');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

function readMe() {
  var descriptor = { };
  assert(!Object.isFrozen(descriptor));
  assert(isFrozen.call(descriptor));
  assert(descriptor == epilog.call(descriptor));
  assert(Object.isFrozen(descriptor));
  assert(isFrozen.call(descriptor));

  descriptor = clone.call(descriptor);
  assert(!Object.isFrozen(descriptor));
  assert(!isFrozen.call(descriptor));
  assert(descriptor == epilog.call(descriptor));
  assert(Object.isFrozen(descriptor));
  assert(isFrozen.call(descriptor));
}
readMe();