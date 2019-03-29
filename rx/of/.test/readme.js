var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('..');

var result = [];
of(0, 1, 2)[Subscribe](o => result.push(o));
assert.deepEqual(result, [0, 1, 2]);