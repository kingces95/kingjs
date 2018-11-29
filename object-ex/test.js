'use strict';

var objectEx = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var is = testRequire('@kingjs/is');

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

function lambdaFunction() {
  var name = 'foo';
  var target = { id:0 };
  objectEx.defineFunction(target, name, 'this.id');

  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert(is.function(descriptor.value));

  var result = target[name]();
  assert(result == 0);
}
lambdaFunction();

function doNotCacheUndefined() {
  var target = { };
  var counter = 0;

  objectEx.setLazyAccessor(target, 'foo', function() {
    if (counter++ == 0)
      return undefined;
    return 0;
  });

  assert(target.foo === undefined);
  assert(target.foo == 0);
}
doNotCacheUndefined();

function stubFunctionTest() {
  var target = { id: 'target' };
  var counter = 0;

  objectEx.defineFunction(target, 'foo', {
    external: true,
    //lazy: true,
    configurable: true,
    value: function(stubName) {
      var stubThis = this;
      return x => ({ 
        arg: x, 
        name: stubName, 
        this: this, 
        stubThis: stubThis,
        counter: counter++
      });
    }
  });

  var result = target.foo('bar');
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
  //assert(result.arg == 'bar');
  assert(result.counter == 0);

  //var result = target.foo('bar');
  //assert(result.counter == 0);
}
stubFunctionTest();

function stubAccessorTest() {
  var target = { id: 'target' };

  objectEx.defineAccessor(target, 'foo', {
    external: true,
    configurable: true,
    get: function(stubName) {
      var stubThis = this;
      return () => ({ 
        name: stubName, 
        this: this, 
        stubThis: stubThis
      });
    }
  });

  var result = target.foo;
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
}
stubAccessorTest();

function defineReference() {
  var target = { 
    children: [ 42, 43, 44 ]
  };

  var counter = 0;

  var resolveUndefined = false;
  function resolveOwnProperty(name) {
    if (resolveUndefined)
      return undefined;

    counter++;
    return this.children[name];
  }

  var defaultAddress = 2;
  objectEx.setReference(target, 'foo', resolveOwnProperty);
  objectEx.setReference(target, 'bar', resolveOwnProperty, defaultAddress);
  objectEx.setReference(target, 'baz', resolveOwnProperty, defaultAddress);

  assertThrows(() => target.foo);

  target.foo = undefined;
  assertThrows(() => target.foo);

  target.foo = undefined;
  assert(counter == 0);

  target.foo = '0';
  assert(counter == 0);

  target.bar = '1';
  assert(counter == 0);

  target.baz = undefined;
  assert(counter == 0);

  assert(target.foo == 42);
  assert(counter == 1);
  assert(target.foo == 42);
  assert(counter == 1);

  assert(target.bar == 43);
  assert(counter == 2);

  resolveUndefined = true;
  assert(target.baz == undefined);
  assert(counter == 2);

  resolveUndefined = false;
  assert(target.baz == 44);
  assert(counter == 3);
}
defineReference();

require('./theory');