'use strict';

var reduce = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  function invoke(accumulator, value, name) {
    accumulator[name] = value + 1;
    return accumulator;
  }
  
  var descriptor = {
    foo: 0,
    bar: 1,
  }
  
  var result = reduce.call(descriptor, { }, invoke);
  assert(result.foo == 1);
  assert(result.bar == 2);
}
readMe();

assertTheory(function(test, id) {
}, {
})