var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var result;
  var error = 'generator error';

  await new Promise(resolve => {
    new create(() => {
      throw error;
    })[Subscribe](null, null, e => {
      result = e;
      resolve();
    });
  })

  assert.deepEqual(result, error)
}
run();