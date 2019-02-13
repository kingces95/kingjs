'use strict';

var isFrozen = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var assertThrows = require('@kingjs/assert-throws');
var symbol = require('@kingjs/descriptor.object.writable-symbol');

assertTheory(function (test, id) { 
  var target = test.array ? [ ] : { };
  
  if (test.writable)
    target[symbol] = undefined;

  if (test.frozen)
    Object.freeze(target);

  if (test.writable && test.frozen) {
    assertThrows(() => isFrozen.call(target));
    return;
  }

  var result = isFrozen.call(target);
  assert(result != test.writable);  
}, {
  array: [ false, true ],
  frozen: [ false, true ],
  writable: [ false, true ]
})
