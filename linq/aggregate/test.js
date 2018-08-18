var aggregate = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var sequence = testRequire('@kingjs/enumerable.create');

var enumerable = sequence(2, 3, 4);

var result = aggregate.call(enumerable, 1, function(a, x) {
  return a + x; 
 });

assert(result == 10);