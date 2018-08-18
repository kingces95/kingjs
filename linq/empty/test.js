var empty = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');

assert(empty() === empty());

var array = toArray.call(empty());
assert(array.length == 0);