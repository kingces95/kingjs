require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var { Next, Error } = require('@kingjs/i-observer');
var Subject = require('@kingjs/rx.subject');
var Rethrow = require('..');

var e = 'e';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

var subject = new Subject();

subject
  [Rethrow](
    o => result.push(e, o),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

subject[Next](0);
subject[Next](1);
subject[Error](2);

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  e, 2,
  E, 2,
]);