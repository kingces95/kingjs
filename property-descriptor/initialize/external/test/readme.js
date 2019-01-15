var assert = require('assert');
var external = require('..');

function Target() { };
function Foo() { }

var descriptor = {
  configurable: true,
  enumerable: false,
  external: function(name, target) {
    assert(name == 'foo');
    assert(target == Target);
    return {
      enumerable: true,
      value: Foo 
    };
  }
}
external.call(descriptor, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);
assert(descriptor.configurable);