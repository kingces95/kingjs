'use strict';

var prolog = require('.');

var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');
var clone = require('@kingjs/descriptor.object.clone');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

function readMe() {
  var descriptor = { };
  assert(isFrozen.call(descriptor));
  assert(descriptor == prolog.call(descriptor));

  descriptor = clone.call(descriptor);
  assert(!isFrozen.call(descriptor));
  assertThrows(() => prolog.call(descriptor));
}
readMe();