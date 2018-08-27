'use strict';

var returnThis = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var helloWorld = 'Hello World!';
  assert(helloWorld == returnThis.call(helloWorld));
}
readMe();

function boxing() {
  var zero = 0;
  assert(zero == returnThis.call(zero));
  assert(zero !== returnThis.call(zero));

  assert(typeof zero == 'number');
  assert(typeof returnThis.call(zero) == 'object');

  assert(zero instanceof Number == false);
  assert(returnThis.call(zero) instanceof Number);

  var boxedZero = new Number(0);
  assert(boxedZero === returnThis.call(boxedZero));
}
boxing();