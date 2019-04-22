require('@kingjs/shim')
var assert = require('assert');
var Pool = require('..');
var Subject = require('@kingjs/rx.subject');
var { Next, Error } = require('@kingjs/rx.i-observer');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

var result = [];
var subject = new Subject();

var promise = new Promise(resolve => {
  subject
    [Pool](async o => o)
    [Subscribe](
      o => {
        result.push(o)
        subject[Error]();
      },
      () => assert(),
      () => resolve()
    )
  subject[Next](0);
  subject[Next](1);
})

promise.then(() => {
  assert.deepEqual(result, [0])
})