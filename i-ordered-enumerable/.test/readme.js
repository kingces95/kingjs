var assert = require('assert');
var IInterface = require('@kingjs/i-interface');
var IEnumerable = require('@kingjs/i-enumerable');
var IOrderedEnumerable = require('..');

var id = Symbol.for('@kingjs/IOrderedEnumerable.createOrderedEnumerable');

assert(IOrderedEnumerable instanceof Function);
assert(IOrderedEnumerable.name == '@kingjs/IOrderedEnumerable');

assert(IOrderedEnumerable.getEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.GetEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.createOrderedEnumerable == id);
assert(IOrderedEnumerable instanceof IInterface);