var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');
var Queue = require('..');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    of(0, 1, 2)
      [Queue](async o => await o + 1)
      [Subscribe](
        o => result.push(o),
        resolve,
      );
  });

  assert.deepEqual(result, [1, 2, 3]);
}
run();