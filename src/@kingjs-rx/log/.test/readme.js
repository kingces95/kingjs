require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');
var Spy = require('..');

var n = 'n';
var c = 'c';
var e = 'e';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

of(0, 1)
  [Spy](
    o => result.push(n, o),
    () => result.push(c),
    o => result.push(e, o),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

assert.deepEqual(result, [
  n, 0, N, 0, 
  n, 1, N, 1, 
  c, C
]);