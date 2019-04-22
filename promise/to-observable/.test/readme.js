var assert = require('assert');
var ToObservable = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable')

var promise = new Promise(resolve => {
  setTimeout(() => {
    resolve();
  });
})

var next, complete;

promise
  [ToObservable]()
  [Subscribe](
    o => next = true,
    o => complete = true
  );

setTimeout(() => {
  assert(next);
  assert(complete);
})