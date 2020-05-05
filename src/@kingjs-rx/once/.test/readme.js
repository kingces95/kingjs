require('@kingjs/shim')
var assert = require('assert');
var Once = require('..');
var clock = require('@kingjs/rx.clock');
var { Subscribe } = require('@kingjs/rx.i-observable');

async function run() {
  var value = 1;
  var result;

  await new Promise(resolve => {
    var observer = clock()[Once](value);
    observer[Subscribe](o => result = o, resolve);
  })

  assert.equal(result, value)
}
run();