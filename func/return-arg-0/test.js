'use strict';

var returnArg0 = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var helloWorld = 'Hello World!';
  assert(helloWorld == returnArg0(helloWorld));
}
readMe();