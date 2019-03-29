var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/i-observable');

async function run() {
  var value = 'value';

  var result = [];
  await new Promise(resolve => {
    new create(function(next) {
      next(value);
      return false;
    })[Subscribe](
      o => result = o, 
      () => resolve()
    );
  })

  assert.deepEqual(result, value)
}
run();