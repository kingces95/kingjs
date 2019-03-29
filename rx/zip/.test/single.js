require('@kingjs/shim')
var assert = require('assert');
var Zip = require('..');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var result;
  var value = 1;

  await new Promise(resolve => {
    var observer = clock()[Zip](value, (tick, i) => ({ tick, i }));
    
    observer[Subscribe](
      o => {
        assert(o.tick <= Date.now());
        result = o.i;
      },
      resolve
    );
  })

  assert.deepEqual(result, value)
}
run();