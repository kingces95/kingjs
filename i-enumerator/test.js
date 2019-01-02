'use strict';

var IEnumerator = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var is = testRequire('@kingjs/is')

var { current, moveNext } = IEnumerator;

function readMe() {
  assert(is.symbol(current));
  assert(is.symbol(moveNext));
}
readMe();