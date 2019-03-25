require('kingjs')
var assert = require('assert');
var range = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var result = [];
  var observable = range(1, 3);
  await new Promise((resolve) => {
    observable[Subscribe](o => result.push(o), resolve);
  })
  assert.deepEqual(result, [1, 2, 3]);
}
run();