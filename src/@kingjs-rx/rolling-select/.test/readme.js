var assert = require('assert');
var ToArray = require('@kingjs/rx.to-array');
var Then = require('@kingjs/rx.then');
var RollingSelect = require('..');
var timer = require('@kingjs/rx.timer');
var from = require('@kingjs/rx.from');

var value = [0, 1, 2];

async function run() {
  var result = await timer()
    [Then](from(value))
    [RollingSelect](
      o => o.slice()
    )
    [ToArray]();

  assert.deepEqual(result, [
    [0],
    [1, 0],
    [2, 1]
  ]);
}
run();
