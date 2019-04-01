require('@kingjs/shim')
var assert = require('assert');
var SelectMany = require('..');
var { Subscribe } = require('@kingjs/i-observable');
var of = require('@kingjs/rx.of');

result = [];

of({ x: of(0, 2) }, { x: of(1, 3) })
  [SelectMany](o => o.x)
  [Subscribe](o => result.push(o));

assert.deepEqual(result, [0, 2, 1, 3])