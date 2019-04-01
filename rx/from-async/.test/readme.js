require('@kingjs/shim')
var assert = require('assert');
var fromAsync = require('..');
var sleep = require('@kingjs/promise.sleep');
var { Subscribe } = require('@kingjs/i-observable');

var result = [];

process.nextTick(async () => {
  var dispose;
  var promise = new Promise(resolve => {
    dispose = fromAsync(async function *() {
      yield 0;
      resolve();
      await sleep(50);
      yield 1;
      await sleep(100);
      yield 2;
    })[Subscribe](
      o => result.push(o)
    );
  })

  assert(result.length == 0);
  await promise;
  assert.deepEqual(result, [0]);
  await sleep(75);
  assert.deepEqual(result, [0, 1]);
  dispose();
  await sleep(100);
  assert.deepEqual(result, [0, 1]);
})
