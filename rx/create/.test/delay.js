require('kingjs')
var assert = require('assert');
var create = require('..');
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
run(delay);
run([delay]);
run(() => delay);
run(async () => delay);
run(function* () { yield delay });
run(async function* () { yield delay });
