var assert = require('assert');
var timer = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var delay = 50;

async function run() {
  var start = Date.now();

  var end;
  await new Promise(resolve => {
    new timer(delay)[Subscribe](
      assert.fail,
      () => { 
        end = Date.now();
        resolve(); 
      }
    );
  })

  assert(end - start >= delay);
}
run();
