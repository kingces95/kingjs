var aggregate = require('./index');
var assert = require('@kingjs/assert');
var sequence = require('@kingjs/sequence');

var enumerable = sequence(2, 3, 4);

var result = aggregate.call(enumerable, 1, function(a, x) {
  return a + x; 
 });

assert(result == 10);