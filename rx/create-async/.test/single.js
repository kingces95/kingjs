var assert = require('assert');
var createAsync = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var value = 1;

  var result;
  await new Promise(resolve => {
    new createAsync(next => {
      next(value);
      return false;
    })[Subscribe](o => result = o, resolve);
  })

  assert.deepEqual(result, value)
}
run();