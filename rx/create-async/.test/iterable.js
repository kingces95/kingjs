var assert = require('assert');
var createAsync = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    new createAsync(function* () {
      for (var i = 0; i < count; i ++) {
        process.nextTick(() => result.push(null));
        yield i;
      }
    })[Subscribe](o => result.push(o), resolve);
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();