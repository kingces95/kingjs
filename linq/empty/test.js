var empty = require('./index');
var assert = require('@kingjs/assert');
var toArray = require('@kingjs/linq.to-array');

assert(empty() === empty());

var array = toArray.call(empty());
assert(array.length == 0);