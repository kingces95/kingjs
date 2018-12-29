var aggregate = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

var sequence = [2, 3, 4];

var result = sequence[aggregate](1, function(x) {
  return this + x; 
});

assert(result == 10);