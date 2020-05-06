var assert = require('assert');
var Subject = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer');

var i = 0;
var complete = false;

new Subject((observer) => {
  observer[Next](i++);
  observer[Complete]();
})[Subscribe](
  o => assert(o == 0),
  () => complete = true
);

assert(complete);
assert(i == 1);