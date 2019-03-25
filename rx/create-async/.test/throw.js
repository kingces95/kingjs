var assert = require('assert');
var createAsync = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var result;
  var error = 'generator error';

  await new Promise(resolve => {
    new createAsync(() => {
      throw error;
    })[Subscribe](null, null, e => {
      result = e;
      resolve();
    });
  })

  assert.deepEqual(result, error)
}
run();