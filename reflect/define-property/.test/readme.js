var assert = require('assert');
var defineProperty = require('..');

var target = { };

// harvest name from named function
defineProperty(
  target, function namedFunction() { }
)
assert(target.namedFunction);

// harvest name from named function in a descriptor
defineProperty(
  target, { value: function namedFunction() { } }
)
assert(target.namedFunction);

// harvest name from named get/set in a descriptor
defineProperty(
  target, { get: function namedAccessor() { } }
)
assert(target.namedAccessor);

// wrap get/set in a function
defineProperty(
  target, 'lambda', { get: 'this' }
)
assert(target.lambda == target);

// wrap value in a function if descriptor is lazy
defineProperty(
  target, 'lazyLambda', { 
    value: 'this.i++', lazy: true 
  }
)
target.i = 0;
assert(target.lazyLambda == 0);
assert(target.lazyLambda == 0);

// wrap value in a function if descriptor is an extension
var GetLength = Symbol('getLength');
defineProperty(
  Object.prototype, GetLength, { 
    value: 'this.length', extends: String 
  }
)
assert('foo'.length == 'foo'[GetLength]());
assert.throws(() => [ ][GetLength]())
