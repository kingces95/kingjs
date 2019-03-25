require('kingjs');
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var Map = require('..');

var result = [];
var completed = false;
[0, 1, 2][Map](o => o + 1)[Subscribe](
  o => result.push(o),
  () => completed = true,
);
assert.deepEqual(result, [1, 2, 3]);
assert(completed);