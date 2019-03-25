var assert = require('assert');
var createAsync = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    new createAsync(next => {

      if (!this.i)
        this.i = 0;

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null));
      
      if (this.i == count)
        return false;

      next(this.i++);
      return true;
    })[Subscribe](o => result.push(o), resolve);
  })

  assert.deepEqual(result, [0, null, 1, null, 2, null])
}
run();