'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var nestedMerge = testRequire('@kingjs/descriptor.nested.merge');
var is = testRequire('@kingjs/is');

function pushFront(array, item) {
  Array.prototype.splice.call(array, 0, 0, item);
  return array;
}

function buildName(test, suffix, pluralSuffix) {
  if (!pluralSuffix)
    pluralSuffix = suffix + 's';

  var name = 'define';
  if (test.configurable)
    name = 'set';
  if (test.enumerable === false)
    name += 'Hidden';
  if (test.writable === false)
    name += 'Const';
  if (test.static === true)
    name += 'Static';
  if (test.future === true)
    name += 'Lazy';

  name += test.plural ? pluralSuffix : suffix;

  return name;
}

function buildDescriptor(test) {
  var descriptor = {
    configurable: test.configurable,
  };

  descriptor = nestedMerge(
    descriptor,
    test, {
      enumerable: null,
      writable: null,
      static: null,
      value: null,
      future: null,
  });

  var result = { };
  for (var key in descriptor)
    result[key] = descriptor[key];

  return result;
}

function assertDescriptor(test, target, name) {
  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert(descriptor);

  assert(descriptor.configurable === test.configurable);

  var isEnumerable = test.enumerable;
  if (is.undefined(isEnumerable))
    isEnumerable = false;

  assert(descriptor.enumerable == isEnumerable);
}

assertTheory(function(test, id) {
  var name = buildName(test, 'Field');
  var descriptor = buildDescriptor(test);

  if (test.static && test.configurable)
    return;

  var target = function target() { };
  
  if (test.descriptor) {
    var arg = descriptor;
    if (test.plural) 
      objectEx.defineProperties(target, { [test.name]: arg });
    else
      objectEx.defineProperty(target, test.name, arg); 
  }
  else {
    var arg = test.value;
    if (test.plural) 
      objectEx[name](target, { [test.name]: arg });
    else
      objectEx[name](target, test.name, arg);
  }

  assert(target[test.name] == test.value);
  assertDescriptor(test, target, test.name);

  if (test.static) {
    var obj = new target();
    assert(obj[test.name] == test.value);

    if (test.writable) {
      target[test.name] = null;
      assert(obj[test.name] === null);
    }
  }
}, {
  value: 0,
  name: ['foo', Symbol.for('foo') ],
  descriptor: [ false, true ],
  static: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  writable: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  assert(!test.configurable);
  var name = buildName(test, 'Function');

  var Type = function() { };

  var count = 0;
  var func = function(x) { 
    count++; 
    assert(test.static ? (this == Type) : (this instanceof Type));
    if (test.future)
      return test.value;
    return x; 
  };

  var stubCount = 0;
  var stub = function(ctor, name) {
    assert(stubCount++ == 0);
    assert(ctor == Type);
    assert(name == test.name);
    return func;
  }

  var arg;
  var named = false;
  switch (test.variant) {
    case this.variant.named:
      if (test.external) return;

      // inferring the function name results in a string, not a symbol
      if (is.symbol(test.name))
        return;

      named = true;
      arg = function foo() { 
        return func.apply(this, arguments); 
      };
      break;

    case this.variant.descriptor:
      var descriptor = buildDescriptor(test);
      descriptor.value = test.external ? null : func;
      descriptor.external = test.external ? stub : undefined;
      descriptor.function = true;
      arg = descriptor;
      name = test.plural ? 'defineProperties' : 'defineProperty';
      break;

    case this.variant.function:
      if (test.external) return;
      arg = func;
      break;

    case this.variant.lambda:
      if (test.external) return;
      if (test.static)
        Type.func = func;
      else
        Type.prototype.func = func;
      arg = 'this.func.apply(this, arguments)';
      break;

    case this.variant.none:
      if (test.external) return;
      arg = { value: func };
      break;

    default: assert();
  }

  var args = [ arg ];
  if (test.plural)
    args = [ { [test.name]: arg } ];
  else if (!named)
    args = [ test.name, arg ];

  pushFront(args, test.static ? Type : Type.prototype);
  objectEx[name].apply(null, args);

  var stubPrototype = Type.prototype;
  var target = test.static ? Type : new Type();

  var expectedCount = 0;
  assert(count == expectedCount++);
  assert(target[test.name](test.value) == test.value);
  assert(count == expectedCount++);
  assert(target[test.name](test.value) == test.value);
  assert(count == (test.future ? 1 : expectedCount++));
  
  if (test.static) {
    assertDescriptor(test, Type, test.name);
  }
  else {
    assertDescriptor(test, stubPrototype, test.name);
    if (test.external)
      assertDescriptor(test, Type.prototype, test.name);
    if (test.future)
      assertDescriptor(test, target, test.name);
  }

  if (test.static) {
    var obj = new Type();
    assert(obj[test.name](test.value) == test.value);
    assert(count == (test.future ? 1 : expectedCount++));
  }
}, {
  value: 0,
  name: ['foo', Symbol.for('foo') ],
  variant: {
    descriptor: 'descriptor',
    named: 'named',
    function: 'function',
    lambda: 'lambda',
    none: 'none'
  },
  configurable: [ false ],
  static: [ true, false ],
  future: [ true, false ],
  external: [ true, false ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var name = buildName(test, 'Accessor');

  if ((test.getter || test.setter) == false)
    return;

  if (test.setter && test.future)
    return;

  if (test.configurable) {
    if (test.static)
      return;
    if (test.future) 
      return;
    if (test.external)
      return;
  }

  if (test.inferName) {
    if (test.lambda)
      return;
    if (is.symbol(test.name))
      return;
  }

  var Type = function() { };
  
  var getCount = 0;
  var getter = test.getter ? function() { 
    assert(test.static ? (this == Type) : (this instanceof Type));
    getCount++; 
    return 0; 
  } : undefined;

  var setter = test.setter ? function(x) {
    assert(test.static ? (this == Type) : (this instanceof Type));
    this.field = x; 
  } : undefined;

  var stubCount = 0;
  var stub = function(ctor, name) {
    assert(ctor == Type);
    assert(name == test.name);
    if (getter && setter) {
      assert(stubCount++ <= 1);
      return {
        get: getter,
        set: setter
      };
    }

    assert(stubCount++ == 0);
    if (!getter) return setter;
    if (!setter) return getter;
  }
  
  var named = false;
  var args = [ ];
  switch (test.variant) {
    case this.variant.named:
      if (test.external) return;

      // inferring the function name results in a string, not a symbol
      if (is.symbol(test.name))
        return;

      named = true;
      var namedGetter = test.getter ? function foo() { return getter.call(this); } : undefined;
      var namedSetter = test.setter ? function foo(value) { setter.call(this, value); } : undefined;
      if (test.wrapped)
        args.push({ get: namedGetter, set: namedSetter });
      else
        args.push(namedGetter, namedSetter);
      break;

    case this.variant.descriptor:
      var descriptor = buildDescriptor(test);
      if (test.external)
        descriptor.external = stub;
      if (test.getter)
        descriptor.get = test.external ? null : getter;
      if (test.setter)
        descriptor.set = test.external ? null : setter;
      args.push(descriptor);
      name = test.plural ? 'defineAccessors' : 'defineAccessor';
      break;

    case this.variant.function:
      if (test.external) return;
      if (test.wrapped)
        args.push({ get: getter, set: setter })
      else
        args.push(getter, setter);
      break;

    case this.variant.lambda:
      if (test.external) return;
      if (test.static)
        Type.func = getter;
      else
        Type.prototype.func = getter;
      var lambdaGet = test.getter ? 'this.func()' : undefined;
      var lambdaSet = test.setter ? 'this.field = value' : undefined;
      if (test.wrapped)
        args.push({ get: lambdaGet, set: lambdaSet })
      else
        args.push(lambdaGet, lambdaSet);
      break;

    default: assert();
  }

  if (test.plural) {
    if (args.length > 1)
      return;
    args = [ { [test.name]: args[0] } ];
  }
  else if (!named)
    args = pushFront(args, test.name);

  pushFront(args, test.static ? Type : Type.prototype);
  objectEx[name].apply(null, args);

  var stubPrototype = Type.prototype;
  var target = test.static ? Type : new Type();

  if (test.setter) {
    target[test.name] = 0
    assert(target.field == 0);
    if (test.static) {
      var obj = new Type();
      assert(obj[test.name] = 1);
      assert(target.field == 1);
    }
  }

  if (test.getter) {
    assert(getCount == 0);

    var expectedGetCount = 0;
    assert(getCount == expectedGetCount++);
    assert(target[test.name] == 0);
    assert(getCount == expectedGetCount++);

    assert(target[test.name] == 0);
    assert(getCount == (test.future ? 1 : expectedGetCount++));

    if (test.static) {
      var obj = new Type();
      assert(obj[test.name] == 0);
      assert(getCount == (test.future ? 1 : expectedGetCount++));
    }
  }

  if (test.static) {
    assertDescriptor(test, Type, test.name);
  }
  else {
    assertDescriptor(test, stubPrototype, test.name);
    if (test.external)
      assertDescriptor(test, Type.prototype, test.name);
    if (test.future)
      assertDescriptor(test, target, test.name);
  }

}, {
  name: ['foo', Symbol.for('foo') ],
  variant: {
    descriptor: 'descriptor',
    named: 'named',
    function: 'function',
    lambda: 'lambda',
  },
  external: [ true, false ],
  future: [ false, true ],
  static: [ false, true ],
  getter: [ false, true ],
  setter: [ false, true ],
  wrapped: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  plural: [ false, true ],
  $assert: function(test, id) {
    //if (test.lazy && test.setter)
    //  return false;
    return true;
  }
})