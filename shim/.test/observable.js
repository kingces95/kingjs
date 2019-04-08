var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
require('../index');

var Value = 'value';

async function run() {
  var result;

  var promise = new Promise(resolve => {
    process.nextTick(() => resolve(Value))
  });
  
  promise[Subscribe](o => result = o);
  await promise;
  assert(result == Value);
}
run();

async function runDispose() {
  var result;

  var promise = new Promise(resolve => {
    process.nextTick(() => resolve(Value))
  });
  
  var dispose = promise[Subscribe](o => result = o);
  dispose();
  await promise;
  assert(result == undefined);
}
runDispose();

async function runThrow() {
  var result;

  var promise = new Promise((resolve, reject) => {
    process.nextTick(() => reject(Value))
  });
  
  promise[Subscribe](assert.fail, assert.fail, o => result = o);
  try { await promise } catch { }
  assert(result == Value);
}
runThrow();

