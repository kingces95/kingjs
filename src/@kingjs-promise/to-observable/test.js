var assert = require('assert');
var ToObservable = require('@kingjs-rx/to-observable');
var { Subscribe } = require('@kingjs-interface/i-observable')

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