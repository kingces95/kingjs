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

  var prototype = { name: 'target' };
  objectEx.defineLazyAccessor(prototype, name, eagerAccessor);
  assert(name in prototype);
  assert(eagerAccessorCallCount == 0);

  var target = Object.create(prototype);

  var descriptorGet = Object.getOwnPropertyDescriptor(target, name);
  assert(descriptorGet === undefined);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var descriptorValue = Object.getOwnPropertyDescriptor(target, name);
  assert('get' in descriptorValue);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert('get' in descriptorValue);
  assert(descriptor.configurable === false);
  assert(descriptor.enumerable === true);
}
lazyAccessor();

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

function throwOnUndefined() {
  var target = { };
  var counter = 0;

  objectEx.defineLazyAccessor(target, 'foo', function() {
    if (counter++ == 0)
      return undefined;
    return 0;
  });

  target = Object.create(target);
  assertThrows(() => target.foo);
  assert(target.foo == 0);
}
throwOnUndefined();

function stubFunctionTest() {
  var func = function myFunc() { };
  var counter = 0;

  objectEx.defineFunction(func.prototype, 'foo', {
    external: true,
    lazy: true,
    configurable: false,
    value: function(stubName) {
      var stubThis = this;
      return x => ({ 
        name: stubName, 
        this: this, 
        stubThis: stubThis,
        counter: counter++
      });
    }
  });

  func.prototype = Object.create(func.prototype);

  var target = new func();
  var result = target.foo();
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
  assert(result.counter == 0);

  var result = target.foo();
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
  assert(result.counter == 0);
}
stubFunctionTest();

function stubAccessorTest() {
  var func = function myFunc() { };
  var counter = 0;

  objectEx.defineAccessor(func.prototype, 'foo', {
    lazy: true,
    external: true,
    configurable: false,
    get: function(stubName) {
      var stubThis = this;
      return () => ({ 
        name: stubName, 
        this: this, 
        stubThis: stubThis,
        counter: counter++
      });
    }
  });

  func.prototype = Object.create(func.prototype);

  var target = new func();
  var result = target.foo;
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
  assert(result.counter == 0);

  var result = target.foo;
  assert(result.this == result.stubThis);
  assert(result.this == target);
  assert(result.name = 'foo');
  assert(result.counter == 0);
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
  assertThrows(() => target.foo = undefined);
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