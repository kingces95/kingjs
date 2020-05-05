var assert = require('assert');
var timer = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');

async function run() {
  var result = [];

  // prove values are returned in different clock ticks
  process.nextTick(() => result.push(null));

  var i = 0;
  await new Promise(resolve => {
    timer()[Subscribe](assert.fail, () => {
      result.push(0);
      resolve();
    });
  })

  assert.deepEqual(result, [null, 0])
}
run();