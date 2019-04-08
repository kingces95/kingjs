var assert = require('assert');
var create = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete, Error } = require('@kingjs/rx.i-observer');

var next;
var complete;

new create((observer) => {
  observer[Next](1);
  observer[Complete]();
})[Subscribe](
  o => next = o, 
  () => complete = true
);

assert(next == 1);
assert(complete);
