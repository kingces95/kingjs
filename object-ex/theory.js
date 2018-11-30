'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');
var nestedMerge = testRequire('@kingjs/descriptor.nested.merge');
var write = testRequire('@kingjs/descriptor.write');
var is = testRequire('@kingjs/is');

function pushFront(array, item) {
  Array.prototype.splice.call(array, 0, 0, item);
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
  if (test.lazy === true)
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
      lazy: null,
  });

  return descriptor;
}

function assertDescriptor(test, target, name) {
  var descriptor = Object.getOwnPropertyDescriptor(target, name);

  //if (test.lazy) {
    //assert(descriptor.configurable === false);
    //assert(descriptor.writable === false);
  //} 
  //else {
    assert(descriptor.configurable === test.configurable);
    //assert(descriptor.writable === test.writable);
  //}

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

var signature = {
  descriptor: 'descriptor',
  named: 'named',
  function: 'function',
  lambda: 'lambda',
  none: 'none'
}

assertTheory(function(test, id) {
  var name = buildName(test, 'Function');

  var target = function() { };

  var callCount = 0;
  var func = function(x) { 
    callCount++; 
    assert(this == target);
    return x; 
  };

  var descriptor = buildDescriptor(test);
  descriptor = write.call(descriptor, 'value', func);

  var args = [ ];
  switch (test.variant) {
    case signature.named:

      // inferring the function name results in a string, not a symbol
      if (is.symbol(test.name))
        return;

      args.push(function foo() { 
        return func.apply(this, arguments); 
      });
      break;

    case signature.descriptor:
      args.push(descriptor);
      name = test.plural ? 'defineFunctions' : 'defineFunction';
      break;

    case signature.function:
      args.push(func);
      break;

    case signature.lambda:
      target.func = func;
      args.push('this.func.apply(this, arguments)');
      break;

    case signature.none:
      args.push({ value: func });
      break;

    default: assert();
  }

  if (test.plural)
    args = [ { [test.name]: args.pop() } ];
  else
    pushFront(args, test.name);

  pushFront(args, target);
  objectEx[name].apply(null, args);

  if (test.lazy && !test.static)
    target = Object.create(target);

  assert(callCount == 0);
  assert(target[test.name](test.value) == test.value);
  assert(callCount == 1);
  assert(target[test.name](test.value) == test.value);
  assert(callCount == test.lazy ? 1 : 2);
  
  assertDescriptor(test, target, test.name);

  if (test.static) {
    var obj = new target();
    assert(obj[test.name](test.value) == test.value);
    assert(callCount == test.lazy ? 1 : 3);
  }
}, {
  value: 0,
  name: ['foo', Symbol.for('foo') ],
  static: [ true, false ],
  lazy: [ true, false ],
  variant: [ 
    signature.descriptor, 
    signature.named, 
    signature.function, 
    signature.none, 
    signature.lambda, 
  ],
  configurable: [ false ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var descriptor = buildDescriptor(test);
  var name = buildName(test, 'Accessor');

  if (test.static && test.configurable)
    return;

  if (test.lambda && test.inferName)
    return;

  if (is.symbol(test.name) && test.inferName)
    return;

  var getCount = 0;
  var target = function() { };
  target.func = function() { 
    getCount++; 
    return 0; 
  };
  
  var getter = function foo() { 
    assert(this == target);
    return this.func(); 
  }
  if (test.lambda)
    getter = 'this.func()';

  descriptor = write.call(descriptor, 'get', getter);
  
  if (test.setter && !test.lazy) {
    var setter = undefined;
    setter = function foo(x) {
      assert(this == target);
      this.field = x; 
    };
    if (test.lambda)
      setter = 'this.field = value';

    if (test.descriptor) {
      descriptor = write.call(descriptor, 'set', setter);
      if (test.plural)
        objectEx.defineAccessors(target, { [test.name]: descriptor });
      else
        objectEx.defineAccessor(target, test.name, descriptor);
    }
    else if (test.plural) {
      if (test.wrapped)
        objectEx[name](target, { [test.name]: { get: getter, set: setter } });
      else
        return;
    }
    else if (test.inferName) {
      if (test.wrapped)
        objectEx[name](target, { get: getter, set: setter });
      else
        objectEx[name](target, getter, setter);
    }
    else {
      if (test.wrapped)
        objectEx[name](target, test.name, { get: getter, set: setter });
      else
        objectEx[name](target, test.name, getter, setter);
    }

    target[test.name] = 0
    assert(target.field == 0);
    if (test.static) {
      var obj = new target();
      assert(obj[test.name] = 1);
      assert(target.field == 1);
    }
  }

  else {
    if (test.descriptor) {
      if (test.plural)
        objectEx.defineAccessors(target, { [test.name]: descriptor });
      else
        objectEx.defineAccessor(target, test.name, descriptor);
    }
    else if (test.plural) {
      if (test.wrapped)
        objectEx[name](target, { [test.name]: { get: getter } });
      else
        objectEx[name](target, { [test.name]: getter });
    }
    else if (test.inferName) {
      if (test.wrapped)
        objectEx[name](target, { get: getter });
      else
        objectEx[name](target, getter);
    }
    else {
      if (test.wrapped)
        objectEx[name](target, test.name, { get: getter });
      else
        objectEx[name](target, test.name, getter);
    }
  }

  assert(getCount == 0);

  if (test.lazy && !test.static)
    target = Object.create(target);

  if (test.lazy && test.configurable)
    return;

  assert(target[test.name] == 0);
  assert(getCount == 1);

  assert(target[test.name] == 0);
  assert(getCount == test.lazy ? 1 : 2);

  assertDescriptor(test, target, test.name);

  if (test.static) {
    var obj = new target();
    assert(obj[test.name] == 0);
  }
}, {
  name: ['foo', Symbol.for('foo') ],
  lazy: [ true, false ],
  static: [ false, true ],
  lambda: [ false, true ],
  setter: [ false, true ],
  inferName: [ false, true ],
  wrapped: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  plural: [ true, false ],
  descriptor: [ false, true ]
})