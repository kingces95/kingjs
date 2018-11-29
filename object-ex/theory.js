'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');
var is = testRequire('@kingjs/is');

function buildName(test, suffix, pluralSuffix) {
  if (!pluralSuffix)
    pluralSuffix = suffix + 's';

  var name = test.configurable ? 'set' : 'define';
  if (test.enumerable === false)
    name += 'Hidden';
  if (test.writable === false)
    name += 'Const';
  if (test.static === true)
    name += 'Static';

  if (test.lazy === true)
    name += 'Lazy';

  name += test.plural ? pluralSuffix : suffix;

  if (test.onTargets === true)
    name += 'OnTargets';
  return name;
}

function assertDescriptor(test, target, name) {
  var descriptor = Object.getOwnPropertyDescriptor(target, name);

  if (test.lazy) {
    assert(descriptor.configurable === false);
    assert(descriptor.writable === false);
  } else {
    assert(descriptor.configurable === test.configurable);
    assert(descriptor.writable === test.writable);
  }

  assert(descriptor.enumerable === test.enumerable);
}

assertTheory(function(test, id) {
  var descriptor = { };
  var name = buildName(test, 'Field', 'Fields', descriptor);
  return;

  if (test.static && test.configurable)
    return;

  var target = function target() { };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  var descriptor = {
    configurable: test.configurable,
    enumerable: test.enumerable,
    static: test.static,
    value: func,
  }

  if (test.descriptor) {
    var suffix = test.onTargets ? 'OnTargets' : '';
    if (test.plural) 
      objectEx['defineProperties' + suffix](targetOrTargets, { [test.name]: descriptor });
    else
      objectEx['defineProperty' + suffix](targetOrTargets, test.name, descriptor); 
  }
  else {
    if (test.plural) 
      objectEx[name](targetOrTargets, { [test.name]: 0 });
    else
      objectEx[name](targetOrTargets, test.name, 0);
  }

  assert(target[test.name] == 0);
  assertDescriptor(test, target, test.name);

  if (test.static) {
    var obj = new target();
    assert(obj[test.name] == 0);
    if (test.writable) {
      target[test.name] = 1;
      assert(obj[test.name] == 1);
    }
  }
}, {
  name: ['foo', Symbol.for('foo') ],
  descriptor: [ false, true ],
  static: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  writable: [ false, true ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var descriptor = { };
  var name = buildName({
    configurable: false,
    onTargets: test.onTargets,
    plural: test.plural,
    static: test.static,
    lazy: test.lazy
  }, 'Function', null, descriptor);

  var callCount = 0;
  var target = function target() { };
  target.func = function() { callCount++; return 0; };

  var func = function() { 
    assert(this == target);
    return this.func(); 
  };
  var targetOrTargets = test.onTargets ? [target] : target;

  if (test.variant == 'named' && is.symbol(test.name))
    return;

  var descriptor = {
    configurable: test.configurable,
    enumerable: test.enumerable,
    static: test.static,
    lazy: test.lazy,
    value: func,
  }

  if (test.plural) {
    switch (test.variant) {
      case 'desc':
        var name = 'defineFunctions'
        if (test.onTargets) name += 'OnTargets';
        objectEx[name](targetOrTargets, { [test.name]: descriptor });
        break;
      case 'named':
        return;
      case 'function':
        objectEx[name](targetOrTargets, { [test.name]: func });
        break;
      case 'lambda':
        objectEx[name](targetOrTargets, { [test.name]: 'this.func()' });
        break;
      case 'none':
        objectEx[name](targetOrTargets, { [test.name]: { value: func } });
        break;
      default: assert();
    }
  }
  
  else {
    switch (test.variant) {
      case 'desc':
        var name = 'defineFunction'
        if (test.onTargets) name += 'OnTargets';
        objectEx[name](targetOrTargets, test.name, descriptor);
        break;
      case 'named':
        objectEx[name](targetOrTargets, function foo() { return func.call(this); });
        break;
      case 'function':
        objectEx[name](targetOrTargets, test.name, func);
        break;
      case 'lambda':
        objectEx[name](targetOrTargets, test.name, 'this.func()' );
        break;
      case 'none':
        objectEx[name](targetOrTargets, test.name, { value: func });
        break;
      default: assert();
    }
  }

  if (test.lazy & !test.configurable) {
    assertThrows(() => target[test.name]())
    return;
  }

  assert(callCount == 0);

  assert(target[test.name]() == 0);
  assert(callCount == 1);

  assert(target[test.name]() == 0);
  assert(callCount == test.lazy ? 1 : 2);
  
  assertDescriptor(test, target, test.name);

  if (test.static) {
    var obj = new target();
    obj[test.name]();
  }
}, {
  name: ['foo', Symbol.for('foo') ],
  static: [ true, false ],
  lazy: [ true, false ],
  variant: [ 'desc', 'named', 'function', 'none', 'lambda' ],
  configurable: [ false ],
  enumerable: [ false ],
  writable: [ false ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
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
  var targetOrTargets = test.onTargets ? [target] : target;
  
  var getter = function foo() { 
    assert(this == target);
    return this.func(); 
  }
  if (test.lambda)
    getter = 'this.func()';

  var descriptor = {
    configurable: test.configurable,
    enumerable: test.enumerable,
    static: test.static,
    lazy: test.lazy,
    get: getter,
  }
  
  if (test.setter && !test.lazy) {
    var setter = undefined;
    setter = function foo(x) {
      assert(this == target);
      this.field = x; 
    };
    if (test.lambda)
      setter = 'this.field = value';

    if (test.descriptor) {
      var suffix = test.onTargets ? 'OnTargets' : '';
      descriptor.set = setter;
      if (test.plural)
        objectEx['defineAccessors' + suffix](targetOrTargets, { [test.name]: descriptor });
      else
        objectEx['defineAccessor' + suffix](targetOrTargets, test.name, descriptor);
    }
    else if (test.plural) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { [test.name]: { get: getter, set: setter } });
      else
        return;
    }
    else if (test.inferName) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { get: getter, set: setter });
      else
        objectEx[name](targetOrTargets, getter, setter);
    }
    else {
      if (test.wrapped)
        objectEx[name](targetOrTargets, test.name, { get: getter, set: setter });
      else
        objectEx[name](targetOrTargets, test.name, getter, setter);
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
      var suffix = test.onTargets ? 'OnTargets' : '';
      if (test.plural)
        objectEx['defineAccessors' + suffix](targetOrTargets, { [test.name]: descriptor });
      else
        objectEx['defineAccessor' + suffix](targetOrTargets, test.name, descriptor);
    }
    else if (test.plural) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { [test.name]: { get: getter } });
      else
        objectEx[name](targetOrTargets, { [test.name]: getter });
    }
    else if (test.inferName) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { get: getter });
      else
        objectEx[name](targetOrTargets, getter);
    }
    else {
      if (test.wrapped)
        objectEx[name](targetOrTargets, test.name, { get: getter });
      else
        objectEx[name](targetOrTargets, test.name, getter);
    }
  }

  if (test.lazy & !test.configurable) {
    assertThrows(() => target[test.name])
    return;
  }

  assert(getCount == 0);

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
  onTargets: [ false, true ],
  plural: [ true, false ],
  descriptor: [ false, true ]
})//, 3089)