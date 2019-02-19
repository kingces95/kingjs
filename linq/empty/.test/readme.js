require('kingjs');
var empty = require('..');

var assert = require('assert');
var ToArray = require('@kingjs/linq.to-array');

assert(empty() === empty());

var array = empty()[ToArray]();
assert(array.length == 0);