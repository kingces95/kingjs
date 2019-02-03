var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var defineProperty = require('..');

assertTheory(function(test, id) {
  var value = 1;
  var nextValue = 2;
  var writeOnceValue = 3;
  var writeOnceDefault = 4;

  var local = value;

  function Type() { };
  function func(x) { return x || local; };
  function getter(x) { return x || local; };
  function setter(x) { local = x; };

  var hasGetter = test.getter;
  var hasSetter = test.setter;
  var useSeed = test.useSeed;
  var hasSeed = test.seed;
  var seed = !test.seed ? undefined : writeOnceDefault;
  var isAccessor = hasGetter || hasSetter;
  var isFunction = test.function;
  var isField = test.field;
  var isValue = isFunction || isField;
  var isLazy = test.lazy;
  var isStatic = test.static;
  var isLambda = test.lambda;
  var isSeeded = test.seeded;
  var isExternal = test.external;
  var name = test.name;
  var configurable = test.configurable;
  var enumerable = test.enumerable;
  var isManual = test.manual;

  if (!isAccessor && !isValue)
    return;

  if (isFunction && isField)
    return;

  if (hasSetter && !hasGetter)
    return;

  if (isSeeded && !isLazy)
    return;

  if (isSeeded && isLambda)
    return;

  // invalid combination
  var throws = false;
  if (isAccessor && isValue)
    throws = true;
  else if (isField && isLazy)
    throws = true;
  else if (hasSetter && isLazy)
    throws = true;

  // target
  var target = isStatic ? Type : Type.prototype;

  // name
  if (test.symbol)
    name = Symbol(name);

  // descriptor
  var descriptor = {
    configurable,
    enumerable,

    lazy: isLazy,
    seeded: isSeeded,
    static: isStatic,
    seed,
  }

  // lambda
  if (isLambda) {
    target.getter = getter;
    getter = 'this.getter()';

    target.setter = setter;
    setter = 'this.setter(value)';
  }

  // type
  if (isFunction)
    descriptor.value = func;
  if (isField)
    descriptor.value = local;
  if (hasGetter)
    descriptor.get = getter;
  if (hasSetter)
    descriptor.set = setter;

  if (isExternal) {
    var originalDescriptor = descriptor;
    function external(d, n, t) {
      assert(n == name);
      assert(t == target);
      assert('extends' in d == false);
      assert('callback' in d == false);
      assert('lazy' in d == false);
      assert('static' in d == false);
      assert('seeded' in d == false);
      assert('seed' in d == false);
      return originalDescriptor;
    }
    descriptor = { callback: external };
  }
  
  if (throws) {
    assert.throws(() => defineProperty(target, name, descriptor));
    return;
  }

  if (isManual) {
    if (isExternal) {
      var callback = descriptor.callback;
      delete descriptor.callback;
      descriptor = callback(descriptor, name, target);
    }

    var { 
      descriptor: result,
      name: resultName 
    } = defineProperty(null, name, descriptor);

    assert(result != descriptor);
    assert('extends' in result == false);
    assert('callback' in result == false);
    assert('lazy' in result == false);
    assert('static' in result == false);
    assert('seeded' in result == false);
    assert('seed' in result == false);
    Object.defineProperty(target, resultName, result);
  } 
  else {
    var result = defineProperty(target, name, descriptor);
    assert(result == target);
  }

  var instance = isStatic ? Type : new Type();
  var getActual = () => isFunction ? instance[name]() : instance[name];

  if (isLazy) {
    var expected = local;
    if (isSeeded) {

      if (useSeed) {
        expected = writeOnceDefault;

        if (!hasSeed) {
          assert.throws(() => getActual());
          return;
        }
      } 
      else {
        expected = writeOnceValue;
        instance[name] = expected;
      }
    }

    var actual = getActual();
    assert(actual === expected);

    local = nextValue;
    actual = getActual();
    assert(actual == expected);
  }
  else {

    // get value via func, getter, or field
    var actual = getActual();
    assert(actual === local);
  }

}, {
  name: 'foo',
  symbol: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  function: [ false, true ],
  getter: [ false, true ],
  setter: [ false, true ],
  field: [ false, true ],
  lambda: [ false, true ],
  lazy: [ false, true ],
  seeded: [ false, true ],
  seed: [ false, true ],
  static: [ false, true ],
  external: [ false, true ],
  manual: [ false, true ],
  useSeed: [ false, true ],

  extends: [ false, true ]
})