require('@kingjs/shim')
var assert = require('assert');
var Pool = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

var result = [];

var promise = new Promise(resolve => {
  of(0, 1, 2)
    [Pool](async o => o)
    [Subscribe](
      o => result.push(o),
      () => resolve()
    )
})

promise.then(() => {
  assert.deepEqual(result, [0, 2])
})