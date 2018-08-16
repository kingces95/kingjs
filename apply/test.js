'use strict';

var apply = require('./index.js');
var assert = require('@kingjs/assert');

assert(apply(0) == 0);

function sortLowerAndJoin() {
  return apply(arguments,
    Array.prototype.sort, [],
    Array.prototype.map, [ function(x) { return x.toLowerCase(); } ],
    Array.prototype.join, ['-']
  )
}
var result = sortLowerAndJoin('Foo', 'Bar', 'Baz');
assert(result == 'bar-baz-foo');