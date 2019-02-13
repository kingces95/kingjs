var empty = require('.');

var assert = require('assert');
var toArray = require('@kingjs/linq.to-array');

assert(empty() === empty());

var array = toArray.call(empty());
assert(array.length == 0);