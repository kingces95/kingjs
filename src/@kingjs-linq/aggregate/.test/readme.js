require('kingjs');
var assert = require('assert');
var Aggregate = require('..');

var sequence = [2, 3, 4];

var result = sequence[Aggregate](1, function(x) {
  return this + x; 
}, o => String(o));

assert(result === '10');