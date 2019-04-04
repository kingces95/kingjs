require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');
var Encore = require('..');

var f = 'f';

var N = 'N';
var C = 'C';
var E = 'E';

var result = [];

of(0, 1)
  [Encore](
    () => result.push(f),
  )
  [Subscribe](
    o => result.push(N, o),
    () => result.push(C),
    o => result.push(E, o),
  );

assert.deepEqual(result, [
  N, 0, 
  N, 1, 
  f, C
]);