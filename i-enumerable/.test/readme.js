var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('..');

var id = Symbol.for('@kingjs/IEnumerable.getEnumerator');

assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');

assert(IEnumerable.getEnumerator == id);
assert(IEnumerable.GetEnumerator == id);
assert(IEnumerable[IInterface.Id] == id);