require('@kingjs/shim')
var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var Publish = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Value } = require('@kingjs/rx.i-published-observable');

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

var subject = new Subject()

var behavior = subject[Publish]();
behavior[Subscribe]();
assert(behavior[Value] === undefined);

subject[Next](0);
assert(behavior[Value] == 0);

behavior
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

behavior[Complete]();
assert.deepEqual(result, [
  N, 0, C
]);