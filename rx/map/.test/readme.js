require('kingjs');
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var Map = require('..');

async function run() {
  var result = [];

  await new Promise((resolve) => {
    [0, 1, 2][Map](o => o + 1)[Subscribe](
      o => result.push(o),
      resolve,
    );
  });

  assert.deepEqual(result, [1, 2, 3]);
}
run();