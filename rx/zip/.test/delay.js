var assert = require('assert');
var create = require('..');
var sleep = require('@kingjs/promise.sleep')
var endless = require('@kingjs/endless')
var { Subscribe } = require('@kingjs/i-observable');
var delay = 50;

async function run(interval) {
  var value = 'value';
  var start = Date.now();

  var result = [];
  await new Promise(resolve => {
    new create(function(next) {
      next(value);
      return false;
    }, interval)[Subscribe](
      o => result = o,
      () => resolve()
    );
  })

  assert(Date.now() - start >= delay);
  assert.deepEqual(result, value)
}
run(endless(delay));
run(endless([delay]));
run(() => delay);
run(endless(function* () { yield delay }));
