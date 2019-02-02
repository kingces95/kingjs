var assert = require('assert');
var defineProperty = require('..');

var target = null;

// create descriptor by harvesting name from named function
var { name, descriptor } = defineProperty(
  null, function foo() { }
)
assert(name == 'foo');
assert(descriptor.value.name == 'foo');

var target = { };

// harvest name from named function
defineProperty(
  target, function foo() { return 0; }
)
assert(target.foo() == 0);

// harvest name from named function in a descriptor
defineProperty(
  target, { value: function bar() { return 0; } }
)
assert(target.bar() == 0);

// harvest name from named get/set in a descriptor
defineProperty(
  target, { get: function baz() { return 0; } }
)
assert(target.baz == 0);

// wrap get/set in a function
defineProperty(
  target, 'lambda', { get: 'this' }
)
assert(target.lambda == target);

// writeOnce
defineProperty(
  target, 'constant', { 
    get: o => o, 
    lazy: true,
    writeOnce: true,
    static: true, // because target == this at runtime
    /* argument: 20 */ // un-comment to provide a default
  }
)
target.constant = 10;
assert.throws(() => target.constant = 20);
assert(target.constant == 10);

// wrap value in a function if descriptor is lazy
defineProperty(
  target, 'lazyLambda', { 
    value: 'this.i++', 
    lazy: true,
    static: true, // because target == this at runtime
  }
)
target.i = 0;
assert(target.lazyLambda() == 0);
assert(target.lazyLambda() == 0);

// wrap value in a function if descriptor is an extension
var GetLength = Symbol('getLength');
defineProperty(
  Object.prototype, GetLength, { 
    value: 'this.length', 
    extends: () => String 
  }
)
assert('foo'.length == 'foo'[GetLength]()); // extends String
assert.throws(() => [ ][GetLength]()) // does not extend Array

// defer creation of descriptor until target and name are known
defineProperty(
  target, 
  'extern', { 
    callback: (d, n, t) => ({
      ...d,
      get: () => ({ 
        target: t, name: n 
      }) 
    })
  }
)
assert(target.extern.name == 'extern');
assert(target.extern.target == target);
