'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  function invoke(value, key) {
    return value + 1;
  }
  
  var descriptor = {
    foo: 0,
    bar: 1,
  }
  
  var result = map.call(descriptor, invoke);
  assert(result.foo == 1);
  assert(result.bar == 2);
}
readMe();

require('./theory.js');