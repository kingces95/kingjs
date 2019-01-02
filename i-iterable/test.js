'use strict';

var IIterable = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var { getIterator } = IIterable;

function readMe() {
  assert(getIterator == Symbol.iterator);
}
readMe();