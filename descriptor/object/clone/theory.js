'use strict';

var clone = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var symbol = testRequire('@kingjs/descriptor.object.writable-symbol');

assertTheory(function (test, id) { 
  var target = test.array ? [ ] : { };
  target[test.name] = test.value;

  var result = clone.call(target);  
  var copied = result !== target;
  assert(copied);
  assert(!Object.isFrozen(result));
  assert(symbol in result);
  assert(result[test.name] === test.value);
  
}, {
  name: '0',
  array: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  frozen: [ false, true ],
})
