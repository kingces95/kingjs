'use strict';

var freeze = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var symbol = require('@kingjs/descriptor.object.writable-symbol');

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
