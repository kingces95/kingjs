var assert = require('assert');
var createFromContext = require('..');

function Target() { };
function Foo() { }

function init(name, target) {
  assert(name == 'foo');
  assert(target == Target);
  return {
    enumerable: true,
    value: Foo 
  };
}

var descriptor = createFromContext(init, 'foo', Target);
assert(descriptor.value == Foo);
assert(descriptor.enumerable);