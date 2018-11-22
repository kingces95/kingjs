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
  var name = buildName(test, 'Reference', 'References');

  var target = { id: 1 };
  function resolve(address) { 
    return this.id + address 
  };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  if (test.plural) 
    objectEx[name](targetOrTargets, { [test.name]: { value: resolve, default: test.default } });
  else
    objectEx[name](targetOrTargets, test.name, resolve, test.default);

  target = Object.create(target);

  assertThrows(() => target[test.name]);

  if (!test.default) {
    target[test.name] = undefined;
    assertThrows(() => target[test.name]);
    target[test.name] = 2;
    assert(target[test.name] == 3);
  } else {
    target[test.name] = undefined;
    assert(target[test.name] == 4);
  }

  test.lazy = true;
  assertDescriptor(test, target, test.name);
}, {
  name: ['foo', Symbol.for('foo') ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  onTargets: [ false, true ],
  plural: [ false, true ],
  default: [ undefined, 3 ]
})

assertTheory(function(test, id) {
  var name = buildName(test, 'Field', 'Fields');

  var target = { };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  if (test.plural) 
    objectEx[name](targetOrTargets, { [test.name]: 0 });
  else
    objectEx[name](targetOrTargets, test.name, 0);

  assert(target[test.name] == 0);
  assertDescriptor(test, target, test.name);
}, {
  name: ['foo', Symbol.for('foo') ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  writable: [ false, true ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var name = buildName({
    configurable: false,
    onTargets: test.onTargets,
    plural: test.plural
  }, 'Function');

  var callCount = 0;
  var target = { func: function() { callCount++; return 0; } }
  var func = function() { return this.func(); };
  var targetOrTargets = test.onTargets ? [target] : target;

  if (test.variant == 'namedFunction' && is.symbol(test.name))
    return;

  if (test.plural) {
    switch (test.variant) {
      case 'namedFunction':
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
      case 'namedFunction':
        objectEx[name](targetOrTargets, function foo() { return this.func(); });
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

  assert(callCount == 0);

  assert(target[test.name]() == 0);
  assert(callCount == 1);

  assert(target[test.name]() == 0);
  assert(callCount == test.lazy ? 1 : 2);
  
  assertDescriptor(test, target, test.name);
}, {
  name: ['foo', Symbol.for('foo') ],
  lazy: [ false, true ],
  variant: [ 'namedFunction', 'function', 'none', 'lambda' ],
  configurable: [ false ],
  enumerable: [ false ],
  writable: [ false ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var name = buildName(test, 'Accessor');

  if (test.lambda && test.inferName)
    return;

  if (is.symbol(test.name) && test.inferName)
    return;

  var getCount = 0;
  var target = { 
    func: function() { 
      getCount++; 
      return 0; 
    } 
  };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  var getter = function foo() { return this.func(); }
  if (test.lambda)
    getter = 'this.func()';

  if (test.setter && !test.lazy) {
    var setter = undefined;
    setter = function foo(x) { this.field = x; };
    if (test.lambda)
      setter = 'this.field = value';

    if (test.plural) {
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
  }

  else {
    if (test.plural) {
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
}, {
  name: ['foo', Symbol.for('foo') ],
  lazy: [ false, true ],
  lambda: [ false, true ],
  setter: [ false, true ],
  inferName: [ false, true ],
  wrapped: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})