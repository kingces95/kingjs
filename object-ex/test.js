'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var name = 'foo';

  var target = { };
  objectEx.defineFunction(target, name, () => 0);
  assert(name in target);
  assert(target[name]() === 0);

  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert(descriptor.configurable === false);
  assert(descriptor.enumerable === false);
  assert(descriptor.writable === false);
}
readMe();

function lazyAccessor() {
  var name = 'foo';

  var eagerAccessorCallCount = 0;
  var eagerAccessor = () => {
    eagerAccessorCallCount++;
    return 0;
  }

  var target = { name: 'target' };
  objectEx.setLazyAccessor(target, name, eagerAccessor);
  assert(name in target);
  assert(eagerAccessorCallCount == 0);

  var descriptorGet = Object.getOwnPropertyDescriptor(target, name);
  assert('get' in descriptorGet);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var descriptorValue = Object.getOwnPropertyDescriptor(target, name);
  assert('value' in descriptorValue);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert(descriptor.writable === false);
  assert(descriptor.configurable === false);
  assert(descriptor.enumerable === true);
  assert(descriptor.value === 0);
}
lazyAccessor();

function lazyInheritedAccessor() {
  var name = 'foo';

  var eagerAccessorCallCount = 0;
  var eagerAccessor = () => {
    eagerAccessorCallCount++;
    return 0;
  }

  var prototype = { };
  objectEx.defineLazyAccessor(prototype, name, eagerAccessor);

  var target = Object.create(prototype);

  assert(name in target);
  assert(eagerAccessorCallCount == 0);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var target = Object.create(prototype);

  assert(name in target);
  assert(eagerAccessorCallCount == 1);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 2);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 2);
}
lazyInheritedAccessor();


require('./theory');