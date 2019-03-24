var assert = require('assert');
var Map = require('..');
var of = require('@kingjs/rx.of');

var result = [];
of(0, 1, 2)[Map](o => o + 1).subscribe(o => result.push(o));
assert.deepEqual(result, [1, 2, 3]);