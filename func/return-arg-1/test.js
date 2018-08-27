'use strict';

var returnArg1 = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  assert('World!' == returnArg1('Hello', 'World!'));
}
readMe();