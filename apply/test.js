'use strict';

var apply = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function sortLowerAndJoin() {
  return apply.call(arguments,
    Array.prototype.sort, [],
    Array.prototype.map, [ function(x) { return x.toLowerCase(); } ],
    Array.prototype.join, ['-']
  )
}
var result = sortLowerAndJoin('Foo', 'Bar', 'Baz');
assert(result == 'bar-baz-foo');