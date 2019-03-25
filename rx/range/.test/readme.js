require('kingjs')
var assert = require('assert');
var range = require('..');

var result = [];
var observable = range(1, 3);
observable.subscribe(o => result.push(o));
assert.deepEqual(result, [1, 2, 3]);