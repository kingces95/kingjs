'use strict';

var freeze = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var symbol = testRequire('@kingjs/descriptor.writable-symbol');

assertTheory(function (test, id) { 
  var target = test.array ? [ ] : { };
  target[symbol] = undefined;

  var result = freeze.call(target);

  var copied = result !== target;
  assert(!copied);
  assert(Object.isFrozen(result));
  assert(symbol in result == false);
  
}, {
  array: [ false, true ],
  frozen: [ false, true ],
})
