var assert = require('assert');
var defineProperty = require('..');

// accessor expressed as lambda
var target = { field: 0 };
defineProperty(target, 'accessor', { 
  get: 'this.field' 
});
assert(target.accessor == 0);
target.field = 1;
assert(target.accessor == 1);

// lazy member function expressed as lambda
function Type() { this.field = 0 };
defineProperty(Type.prototype, 'func', { 
  function: true,
  value: 'this.field',
  lazy: true,
});
var instance = new Type();
assert(instance.func() == 0);
instance.field = 1;
assert(instance.func() == 0);

// static lazy accessor expressed as lambda 
Type.staticField = 0;
defineProperty(Type, 'accessor', { 
  get: 'this.staticField',
  lazy: true,
  static: true,
});
assert(Type.accessor == 0);
Type.staticField = 1;
assert(Type.accessor == 0);

// field defined via callback once `name` and `target` are known
var descriptor = { 
  callback: function(self, name, target) {
    self.value = `${target.constructor.name}.${name}`
  }, 
}
defineProperty(Type.prototype, 'foo', descriptor);
defineProperty(Type.prototype, 'bar', descriptor);
var instance = new Type();
assert(instance.foo == 'Type.foo');
assert(instance.bar == 'Type.bar');

// token resolver
var tokens = [ '?', 'x', 'y', 'z' ];
defineProperty(Type.prototype, 'letter', {
  lazy: true,
  writeOnce: true,
  argument: 0,
  get: o => token[o]
});
var instance = new Type();
assert(instance.letter = '?');

var instance = new Type();
instance.letter = 2;
assert(instance.letter = 'y');

// extend `Array` with function Any() expressed as a lambda
var Any = Symbol('any');
defineProperty(Object.prototype, Any, {
  extends: () => Array,
  value: 'this.length > 0',
});
assert([][Any]() == false);
assert.throws(() => ''[Any]());