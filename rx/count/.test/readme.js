require('kingjs')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var from = require('@kingjs/rx.from');
var Count = require('..');

var result;
var complete = false;
from([0, 1, 2])[Count]()[Subscribe](
  o => result = o,
  () => complete = true
);
assert(result == 3);
assert(complete);