var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var count = 3;
  var result = [];

  await new Promise(resolve => {
    var dispose = new create(function(next) {

      if (!this.i)
        this.i = 0;

      process.nextTick(() => {
        if (this.i < count)
          return;
        dispose();
        resolve();
      });
      
      if (this.i == count)
        return false;

      next(this.i++);
      return true;
    })[Subscribe](o => result.push(o));
  })

  assert.deepEqual(result, [0, 1, 2])
}
run();