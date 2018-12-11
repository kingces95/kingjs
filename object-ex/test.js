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
  assert('value' in descriptorValue);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 1);

  var descriptor = Object.getOwnPropertyDescriptor(target, name);
  assert('value' in descriptorValue);
  assert(descriptor.configurable === false);
  assert(descriptor.enumerable === true);

  var target = Object.create(prototype);
  assert(descriptorGet === undefined);
  assert(target[name] === 0);
  assert(eagerAccessorCallCount == 2);
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

function stubFunctionTest(isFunc) {
  var Type = function MyType() { };
  var counter = 0;

  objectEx['define' + (isFunc ? 'Function' : 'Accessor')](
    Type.prototype, 'foo', {
      external: true,
      future: true,
      configurable: false,
      [isFunc ? 'value' : 'get']: function(ctor, stubName) {
        return function () { 
          return {
            name: stubName, 
            this: this, 
            ctor: ctor,
            counter: counter++
          }
        };
      }
    }
  );

  var instance = new Type();
  var result = isFunc ? instance.foo() : instance.foo;
  assert(result.ctor == Type);
  assert(result.this == instance);
  assert(result.name = 'foo');
  assert(result.counter == 0);

  var result = isFunc ? instance.foo() : instance.foo;
  assert(result.ctor == Type);
  assert(result.this == instance);
  assert(result.name = 'foo');
  assert(result.counter == 0);
}
stubFunctionTest(true);
stubFunctionTest(false);

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
  target.foo = '0';
  assert(counter == 0);

  target.bar = '1';
  assert(counter == 0);

  assertThrows(() => target.baz = undefined);
  assert(counter == 0);

  assert(target.foo == 42);
  assert(counter == 1);
  assert(target.foo == 42);
  assert(counter == 1);

  assert(target.bar == 43);
  assert(counter == 2);

  resolveUndefined = true;
  assertThrows(() => target.baz);
  assert(counter == 2);

  resolveUndefined = false;
  assert(target.baz == 44);
  assert(counter == 3);
}
defineReference();

function testExtension() {
  function Bar() { };
  function Baz() { };

  function IFoo() { throw 'abstract'; };
  Object.defineProperty(IFoo, Symbol.hasInstance, {
    value: function(x) { 
      if (x instanceof Bar)
        return true;
      if (x instanceof Array)
        return true; 
    }
  });

  // function
  var methodEx = Symbol('method');
  objectEx.defineProperty(
    IFoo.prototype,
    methodEx, {
      function: true,
      extension: true,
      value: function() { return this; },
    }
  )

  var bar = new Bar();
  assert(bar[methodEx]() == bar);
  assert(bar[methodEx]() == bar);

  var baz = new Baz();
  assertThrows(() => baz[methodEx]());

  // getter
  var getterEx = Symbol('getter');
  objectEx.defineProperty(
    IFoo.prototype,
    getterEx, {
      extension: true,
      get: function() { return this; },
    }
  )

  assert(bar[getterEx] == bar);
  assert(bar[getterEx] == bar);

  // setter
  var setterEx = Symbol('setter');
  objectEx.defineProperty(
    IFoo.prototype,
    setterEx, {
      extension: true,
      set: function(value) { 
        this.field = value; 
      },
    }
  )

  bar[setterEx] = 42;
  assert(bar.field == 42);

  // primitive
  var array = [ ];
  assert(array[getterEx] == array)
}
testExtension();

require('./theory');