'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

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
  var name = buildName(test, 'Property', 'Properties');

  var target = { };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  if (test.plural) 
    objectEx[name](targetOrTargets, { [test.name]: 0 });
  else
    objectEx[name](targetOrTargets, test.name, 0);

  assert(target[test.name] == 0);
  assertDescriptor(test, target, test.name);
}, {
  name: 'foo',
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

  var target = { };
  var targetOrTargets = test.onTargets ? [target] : target;

  if (test.plural) {
    switch (test.variant) {
      case 'namedFunction':
        return;
      case 'function':
        objectEx[name](targetOrTargets, { [test.name]: () => 0 });
        break;
      case 'none':
        objectEx[name](targetOrTargets, { [test.name]: { value: () => 0 } });
        break;
      default: assert();
    }
  }
  
  else {
    switch (test.variant) {
      case 'namedFunction':
        objectEx[name](targetOrTargets, function foo() { return 0; });
        break;
      case 'function':
        objectEx[name](targetOrTargets, test.name, () => 0);
        break;
      case 'none':
        objectEx[name](targetOrTargets, test.name, { value: () => 0 });
        break;
      default: assert();
    }
  }

  assert(target[test.name]() == 0);
  assertDescriptor(test, target, test.name);
}, {
  name: 'foo',
  variant: [ 'namedFunction', 'function', 'none' ],
  configurable: [ false ],
  enumerable: [ false ],
  writable: [ false ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})

assertTheory(function(test, id) {
  var name = buildName(test, 'Accessor');

  var target = { };
  var targetOrTargets = test.onTargets ? [target] : target;
  
  var getter = function() { return 0 };
  if (test.namedGetter)
    getter = function foo() { return 0 };

  if (test.setter && !test.lazy) {
    var field = undefined;
    var setter = undefined;
    setter = (x) => field = x;

    if (test.plural) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { [test.name]: { get: getter, set: setter } });
      else
        return;
    }
    else if (test.namedGetter) {
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
    assert(field == 0);
  }

  else {
    if (test.plural) {
      if (test.wrapped)
        objectEx[name](targetOrTargets, { [test.name]: { get: getter } });
      else
        objectEx[name](targetOrTargets, { [test.name]: getter });
    }
    else if (test.namedGetter) {
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
  
  assert(target[test.name] == 0);
  assertDescriptor(test, target, test.name);
}, {
  name: 'foo',
  lazy: [ false, true ],
  setter: [ false, true ],
  namedGetter: [ false, true ],
  wrapped: [ false, true ],
  configurable: [ false, true ],
  enumerable: [ false, true ],
  onTargets: [ false, true ],
  plural: [ false, true ]
})