var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
require('../index');

var Value = 'value';

async function run() {
  var result;

  var promise = new Promise(resolve => {
    process.nextTick(() => resolve(Value))
  });
  
  var dispose = promise[Subscribe](o => result = o);
  await promise;
  assert(result == Value);
}
run();
