'use strict';

var returnArg0 = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  var helloWorld = 'Hello World!';
  assert(helloWorld == returnArg0(helloWorld));
}
readMe();