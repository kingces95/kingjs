require('@kingjs/shim')
var assert = require('assert');
var Subject = require('@kingjs/rx.subject');
var Select = require('@kingjs/rx.select');
var Publish = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Value } = require('@kingjs/rx.i-published-observable');

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

var subject = new Subject()
var addOne = subject[Select](o => o + 1)

var behavior = addOne[Publish]();
behavior[Subscribe]();
assert(behavior[Value] === undefined);

subject[Next](0);
assert(behavior[Value] == 1);

behavior
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

subject[Complete]();
assert.deepEqual(result, [
  N, 1, C
]);