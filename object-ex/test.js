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

function testExternalExtension() {
  function A() { }
  A.i = 0;
  A.generate = () => A.i++;

  function B() { }
  B.i = 10;
  B.generate = () => B.i++;
  B.prototype = new A();

  function C() { }
  C.i = 20;
  C.generate = () => C.i++;
  C.prototype = new B();

  objectEx.createProperty(A, 'ext', {
    extends: () => A,
    external: true,
    future: true,
    get: function(ctor, name) {
      assert(name == 'generate');
      return ctor.generate;
    }
  });

  var a = new A();
  assert(a.ext == 0); // patches with new stub/caches
  assert(a.ext == 0); // hits cache
  assert(A.i == 1); // hits cache, so shouldn't increment

  var b = new B();
  assert(b.ext == 10); // invokes new stub, patches with new stub/cache
  assert(b.ext == 10); 
  assert(B.i == 11);
  
  var c = new C();
  assert(c.ext == 20); // invokes new stub, patches with new stub/cache
  assert(c.ext == 20); 
  assert(C.i == 21);
}
testExternalExtension();

function testStatic() {
  var funcName = 'foo';
  var getterName = 'bar';
  var setterName = 'baz';
  var fieldName = 'moo';

  var field; 
  var Type = function Type() { };
  objectEx.defineFunction(Type, funcName, { value: () => 0, static: true });
  objectEx.defineAccessor(Type, getterName, { get: () => 0, static: true });
  objectEx.defineAccessor(Type, setterName, { set: x => field = x, static: true });
  objectEx.defineProperty(Type, fieldName, { value: 42, writable: true, static: true });

  var instance = new Type();

  assert(funcName in Type && funcName in instance);
  assert(Type[funcName]() === 0);
  assert(instance[funcName]() === 0);

  assert(getterName in Type && getterName in instance);
  assert(Type[getterName] === 0);
  assert(instance[getterName] === 0);

  assert(setterName in Type && setterName in instance);
  assert(Type[setterName] = 0, field == 0);
  assert(instance[setterName] = 1, field == 1);

  assert(fieldName in Type && fieldName in instance);
  assert(Type[fieldName] === 42);
  assert(instance[fieldName] === 42);
  assert(Type[fieldName] = 0, Type[fieldName] == 0);
  assert(instance[fieldName] = 1, Type[fieldName] == 1);
}
testStatic();

function testThunk() {
  var funcName = 'foo';
  var getterName = 'bar';
  var setterName = 'baz';
  var fieldName = 'moo';

  var funcSym = Symbol('foo');
  var getterSym = Symbol('bar');
  var setterSym = Symbol('baz');
  var fieldSym = Symbol('moo');

  var field; 
  var Type = function Type() { };
  objectEx.defineFunction(Type, funcSym, { thunk: funcName });
  objectEx.defineAccessor(Type, getterSym, { thunk: getterName });
  objectEx.defineAccessor(Type, setterSym, { thunk: setterName });
  objectEx.defineProperty(Type, fieldSym, { thunk: fieldName });

  objectEx.defineFunction(Type, funcName, { value: () => 0, });
  objectEx.defineAccessor(Type, getterName, { get: () => 0, });
  objectEx.defineAccessor(Type, setterName, { set: x => field = x });
  objectEx.defineProperty(Type, fieldName, { value: 42, writable: true });

  assert(funcName in Type && funcSym in Type);
  assert(Type[funcName]() === 0);
  assert(Type[funcSym]() === 0);

  assert(getterName in Type && getterSym in Type);
  assert(Type[getterName] === 0);
  assert(Type[getterSym] === 0);

  assert(setterName in Type && setterSym in Type);
  assert(Type[setterName] = 0, field == 0);
  assert(Type[setterSym] = 1, field == 1);

  assert(fieldName in Type && fieldSym in Type);
  assert(Type[fieldName] === 42);
  assert(Type[fieldSym] === 42);
  assert(Type[fieldName] = 0, Type[fieldName] == 0);
  assert(Type[fieldSym] = 1, Type[fieldName] == 1);
}
testThunk();

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
  function MyObject() { };
  var myObjectPrototype = new MyObject();

  // extensions on myObjectPrototype are written to Node.prototype
  function Node() { };
  Node.prototype = myObjectPrototype;

  function Bar() { };
  Bar.prototype = new Node();

  function Baz() { };
  Baz.prototype = new Node();

  function IFoo() { throw 'abstract'; };
  Object.defineProperty(IFoo, Symbol.hasInstance, {
    value: function(x) { 
      return x instanceof Bar;
    }
  });

  // function
  var methodEx = Symbol('method');
  objectEx.defineProperty(
    myObjectPrototype,
    methodEx, {
      function: true,
      extends: () => IFoo,
      value: function(x) { return x; },
    }
  )

  var bar = new Bar();
  assert(bar[methodEx](42) == 42);
  assert(bar[methodEx](43) == 43);

  var baz = new Baz();
  assertThrows(() => baz[methodEx]());

  // getter
  var getterEx = Symbol('getter');
  objectEx.defineProperty(
    myObjectPrototype,
    getterEx, {
      extends: () => IFoo,
      get: function() { return this; },
    }
  )

  assert(bar[getterEx] == bar);
  assert(bar[getterEx] == bar);

  // setter
  var setterEx = Symbol('setter');
  objectEx.defineProperty(
    myObjectPrototype,
    setterEx, {
      extends: () => IFoo,
      set: function(value) { 
        this.field = value; 
      },
    }
  )

  bar[setterEx] = 42;
  assert(bar.field == 42);
}
testExtension();

function testArrayExtension() {

  function IFoo() { throw 'abstract'; };
  Object.defineProperty(IFoo, Symbol.hasInstance, {
    value: function(x) { 
      return x instanceof Array;
    }
  });

  // function
  var methodEx = Symbol('method');
  objectEx.defineProperty(
    Object.prototype,
    methodEx, {
      function: true,
      extends: () => IFoo,
      value: function(x) { return x; },
    }
  )

  // primitive
  var array = [ ];
  assert(array[methodEx](42) == 42)
}
testArrayExtension();

require('./theory');