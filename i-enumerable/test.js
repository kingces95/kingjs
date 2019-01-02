'use strict';

var IEnumerable = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var is = testRequire('@kingjs/is')

var { getEnumerator } = IEnumerable;

function readMe() {
  assert(is.symbol(getEnumerator));
}
readMe();