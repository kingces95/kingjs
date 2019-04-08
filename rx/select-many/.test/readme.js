require('@kingjs/shim')
var assert = require('assert');
var SelectMany = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

// for each emission select many `IObservable`s
result = [];
of({ 
  x: of(0, 2) 
}, { 
  x: of(1, 3) 
})
  [SelectMany](o => o.x, o => -o)
  [Subscribe](o => result.push(o));
assert.deepEqual(result, [0, -2, -1, -3])

// for each emission select many iterables
result = [];
of({ 
  x: [0, 2]
}, { 
  x: [1, 3]
})
  [SelectMany](o => o.x, o => -o)
  [Subscribe](o => result.push(o));
assert.deepEqual(result, [0, -2, -1, -3])