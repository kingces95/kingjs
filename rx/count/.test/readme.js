require('kingjs')
var assert = require('assert');
var Count = require('..');

var result;
var complete = false;
[0, 1, 2][Count]().subscribe(
  o => result = o,
  () => complete = true
);
assert(result == 3);
assert(complete);