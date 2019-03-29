var assert = require('assert');
var Zip = require('..');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    var ticker = clock();
    ticker[Zip](function* () {
      for (var i = 0; i < count; i ++) {
        process.nextTick(() => result.push(null));
        yield i;
      }
    }, (tick, i) => ({ tick, i }))[Subscribe](
      o => {
        assert(o.tick <= Date.now());
        result.push(o.i);
      },
      resolve
    );
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();