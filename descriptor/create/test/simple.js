'use strict';

var create = require('../index');
var testRequire = require('../..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var is = testRequire('@kingjs/is');

function empty() {
  assert(is.object(create()));
}
empty();

function fail() {
  assertThrows(() => create('Bob'));
}
fail();
