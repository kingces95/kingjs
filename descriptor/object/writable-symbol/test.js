'use strict';

var writableSymbol = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var is = testRequire('@kingjs/is');

function readMe() {
  assert(is.symbol(writableSymbol));
}
readMe();