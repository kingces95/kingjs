require('kingjs');
var assert = require('assert');
var Map = require('..');

var result = [];
var completed = false;
[0, 1, 2][Map](o => o + 1).subscribe(
  o => result.push(o),
  () => completed = true,
);
assert.deepEqual(result, [1, 2, 3]);
assert(completed);