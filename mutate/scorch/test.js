'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var source = { a: undefined };
  assert('a' in source);  

  var result = scorch.call(source);
  assert(result == source);  
  assert('a' in result == false);  
}
readMe();