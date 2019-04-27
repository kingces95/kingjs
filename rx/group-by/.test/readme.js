require('@kingjs/shim')
var assert = require('assert');
var GroupBy = require('..');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var of = require('@kingjs/rx.of');

result = { };
of(0, 1, 2, 3)
  [GroupBy](
    o => o % 2 ? 'odd' : 'even', 
    (k, o) => -o,
    k => new Subject(),

  )
  [Subscribe](o => {
    var values = result[o[Key]] = [];
    o[Subscribe](x => values.push(x))
  });

assert.deepEqual(result, {
  even: [ 0, -2 ],
  odd: [ -1, -3 ]
})