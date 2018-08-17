'use strict';

var forEach = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');

function readme() {
  var result = [];
  
  forEach(function(x, i) {
    result.push(x + ' at ' + i)
  }, sequence('a', 'b', 'c'));
  
  assert(result[0] == 'a at 0');
  assert(result[1] == 'b at 1');
  assert(result[2] == 'c at 2');
}
readme();

var self = { };
forEach.call(self, function(x, i) {
  assert(this == self);
  assert(x == 'a');
  assert(i == 0);
}, sequence('a'));
