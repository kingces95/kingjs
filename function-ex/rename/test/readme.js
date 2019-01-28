var assert = require('assert');
var rename = require('..');

function foo() { }
var fooDescriptor = Object.getOwnPropertyDescriptor(foo, 'name');
assert(fooDescriptor.value == 'foo');

var bar = rename.call(foo, 'bar');
var barDescriptor = Object.getOwnPropertyDescriptor(foo, 'name');
assert(barDescriptor.value == 'bar');
assert(barDescriptor.enumerable == fooDescriptor.enumerable);
assert(barDescriptor.configurable == fooDescriptor.configurable);
assert(barDescriptor.writable == fooDescriptor.writable);
