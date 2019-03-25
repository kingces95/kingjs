var assert = require('assert');
var of = require('..');

var result = [];
var observable = of(0, 1, 2);
observable.subscribe(o => result.push(o));
assert.deepEqual(result, [0, 1, 2]);