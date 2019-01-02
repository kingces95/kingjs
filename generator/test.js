'use strict';

var Generator = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  assert(Generator == (function* protoGenerator() { }).constructor);
}
readMe();