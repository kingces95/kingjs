require('@kingjs/shim')
var assert = require('assert');
var GroupBy = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/i-grouped-observable');
var of = require('@kingjs/rx.of');

result = { };
of(0, 1, 2, 3)
  [GroupBy](o => o % 2 ? 'odd' : 'even', o => -o)
  [Subscribe](o => {
    var values = result[o[Key]] = [];
    o[Subscribe](x => values.push(x))
  });

assert.deepEqual(result, {
  even: [ 0, -2 ],
  odd: [ -1, -3 ]
})