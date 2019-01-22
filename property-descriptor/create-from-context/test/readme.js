var assert = require('assert');
var external = require('..');

function Target() { };
function Foo() { }

var descriptor = {
  configurable: true,
  enumerable: false,
}

external.call(descriptor, () => Foo, 'foo', Target);
assert(descriptor.value == Foo);
assert(!descriptor.enumerable);
assert(descriptor.configurable);

function init(name, target) {
  assert(name == 'foo');
  assert(target == Target);
  return {
    enumerable: true,
    value: Foo 
  };
}

external.call(descriptor, init, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);
assert(descriptor.configurable);