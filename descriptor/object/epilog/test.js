'use strict';

var epilog = require('.');

var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');
var clone = require('@kingjs/descriptor.object.clone');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

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

function assertObject() {
  assertThrows(() => epilog.call('foo'));
  assertThrows(() => epilog.call(0));
  assertThrows(() => epilog.call());
}
assertObject();

function nullOk() {
  assert(null === epilog.call(null));
}
nullOk();