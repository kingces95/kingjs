require('kingjs')
var assert = require('assert');

var Append = require('..');
var ToArray = require('@kingjs/linq.to-array');

var source = [ 0, 1, 2 ];
var enumerable = source[Append](3);
var result = enumerable[ToArray]();

assert.deepEqual([0, 1, 2, 3], result);