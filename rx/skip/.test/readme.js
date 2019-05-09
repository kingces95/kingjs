var assert = require('assert');
var of = require('@kingjs/rx.of');
var Skip = require('..');
var ToArray = require('@kingjs/rx.to-array')

of(0, 1, 2, 3)
  [Skip](2)
  [ToArray]()
  .then(
    o => assert.deepEqual(o, [2, 3])
  )