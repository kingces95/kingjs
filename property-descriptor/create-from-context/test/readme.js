var assert = require('assert');
var createFromContext = require('..');

function Type() { };
Type.info = x => x.toUpperCase();;

function init(name, target) {
  var ctor = target.constructor;
  return { value: () => ctor.info(name) };
}

var { target, name, descriptor } = createFromContext(Type.prototype, 'foo', init);
Object.defineProperty(target, name, descriptor);
var instance = new Type();
assert(instance.foo() == 'FOO');