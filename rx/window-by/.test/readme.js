require('@kingjs/shim')
var assert = require('assert');
var WindowBy = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var Subject = require('@kingjs/rx.subject');
var of = require('@kingjs/rx.of');
var Select = require('@kingjs/rx.select');
var SelectMany = require('@kingjs/rx.select-many');
var ToArray = require('@kingjs/rx.to-array');

var result = []
var divisor = 3

of(0, 1, 2, 3, 4, 5, 6, 7)
  [WindowBy](
    o => Math.floor(o / divisor), 
    (l, r) => l == r,
    (key, value) => ({ key, value }),
    key => new Subject()
  )
  [Subscribe](o => o
    [ToArray]()
    [Subscribe](
      x => result.push(x)
    )
  )

return
assert.deepEqual(result, {
  even: [ 0, -2 ],
  odd: [ -1, -3 ]
})