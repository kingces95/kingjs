'use strict';

var snapshot = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  var type = typeof snapshot();
  assert(type == 'number');
  assert(snapshot() != snapshot());
}
readMe();