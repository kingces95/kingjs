require('@kingjs/shim')
var assert = require('assert');
var GroupBy = require('..');
var Subject = require('@kingjs/rx.subject');
var { Subscribe } = require('@kingjs/rx.i-observable');
var { Key } = require('@kingjs/rx.i-grouped-observable');
var { Next, Complete } = require('@kingjs/rx.i-observer');

var subject = new Subject();
var grouping = subject
  [GroupBy](
    o => o % 2 ? 'odd' : 'even', 
    k => new Subject(),
  )

result = { };
grouping
  [Subscribe](o => {
    var values = result[o[Key]] = [];
    o[Subscribe](x => values.push(x))
  });

subject[Next](0)
subject[Next](1)
subject[Next](2)
subject[Next](3)

assert.deepEqual(result, {
  even: [ 0, 2 ],
  odd: [ 1, 3 ]
})
assert(grouping.groups.even instanceof Subject)
assert(grouping.groups.odd instanceof Subject)

// replay groups for subsequent subscriptions
result = [ ];
grouping[Subscribe](
  o => result.push(o[Key])
)
assert.deepEqual(result, ['even', 'odd'])

subject[Complete]();
result = [ ];
grouping[Subscribe](
  o => result.push(o[Key])
)
assert.deepEqual(result, [ ])
