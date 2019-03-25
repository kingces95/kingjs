require('kingjs');
var assert = require('assert');
var DebounceTime = require('..');
var ToObservable = require('@kingjs/linq.to-observable');
var { Subscribe } = require('@kingjs/i-observable');

var duration = 50;

async function run() {
  var result = [];

  var start = Date.now();
  await new Promise((resolve) => {
    [0, 1][ToObservable](duration * 2)[DebounceTime](duration)[Subscribe](
      o => result.push(o),
      resolve,
    );
  });

  assert.deepEqual(result, [0, 1]);
}
run();