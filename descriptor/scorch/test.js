'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var assertThrows = testRequire('@kingjs/assert-throws');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');
var clone = testRequire('@kingjs/descriptor.object.clone');

function readMe() {
  var source = { a: undefined };
  assert('a' in source);  

  var result = scorch.call(source);
  assert(isFrozen.call(result));
  assert(result != source);  
  assert('a' in result == false);  
}
readMe();

function arrayScorch() {
  var source = [ undefined ];
  var result = scorch.call(source);
  assert(isFrozen.call(result));
  assert(result != source);  

  assert(result.length == 0);  
}
arrayScorch();

function arrayCompactor() {
  var source = [ 0, undefined, 1, undefined, 2 ];
  var result = scorch.call(source);
  assert(isFrozen.call(result));
  assert(result != source);  

  assert(result.length == 3);  
  assert(result[0] == 0);  
  assert(result[1] == 1);  
  assert(result[2] == 2);  
}
arrayCompactor();

function precondition() {
  var thawed = clone.call({ });
  assert(!isFrozen.call(thawed));
  assertThrows(() => scorch.call(thawed));
}
precondition();

require('./theory');