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

function testFuture(isStatic) {
  function Type() { };

  if (isStatic) {
    Type.x = 1;
    Type.y = 2;
    Type.counter = 0;
  } else {
    Type.prototype = { x: 1, y: 2, counter: 0 };
  }

  var withOutInit = 'this.counter++, this.x + this.y';
  var withInit = function(o) { return this.counter++, o };
  
  var target = isStatic ? Type : Type.prototype;

  objectEx.defineProperty(target, 'lazy', {
    static: isStatic,
    future: true,
    value: withOutInit,
  });
  
  var instance = isStatic ? Type : new Type();
  assert(instance.lazy() == 3);
  assert(instance.lazy() == 3);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'compile', {
    static: isStatic,
    future: true,
    writeOnce: true,
    value: withInit
  });

  var instance = isStatic ? Type : new Type();
  assertThrows(() => instance.compile());
  instance.compile = 42;
  assert(instance.compile() == 42);
  assert(instance.compile() == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'load', {
    static: isStatic,
    future: true,
    argument: 41,
    value: withInit
  });

  var instance = isStatic ? Type : new Type();
  instance.load = 42;
  assert(instance.load() == 42);
  assert(instance.load() == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'load2', {
    static: isStatic,
    future: true,
    argument: 41,
    value: withInit
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.load2() == 41);
  assert(instance.load2() == 41);
  assert(instance.counter == 1);
  target.counter = 0;
    
  objectEx.defineProperty(target, 'computedProperty', {
    static: isStatic,
    future: true,
    get: withOutInit
  });
  
  var instance = isStatic ? Type : new Type();
  assert(instance.computedProperty == 3);
  assert(instance.computedProperty == 3);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'ref', {
    static: isStatic,
    future: true,
    writeOnce: true,
    get: withInit
  });
  
  var instance = isStatic ? Type : new Type();
  assertThrows(() => instance.ref);
  instance.ref = 42;
  assert(instance.ref == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'refWithDefault', {
    static: isStatic,
    future: true,
    argument: null,
    get: withInit
  });
  
  var instance = isStatic ? Type : new Type();
  instance.refWithDefault = 42;
  assert(instance.refWithDefault == 42);
  assert(instance.refWithDefault == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'refWithDefault2', {
    static: isStatic,
    future: true,
    argument: null,
    get: withInit
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.refWithDefault2 === null);
  assert(instance.refWithDefault2 === null);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'readOnly', {
    static: isStatic,
    future: true,
    writeOnce: true,
  });
  
  var instance = isStatic ? Type : new Type();
  assertThrows(() => instance.readOnly);
  instance.readOnly = 42;
  assert(instance.readOnly == 42);

  objectEx.defineProperty(target, 'readOnlyWithDefault', {
    static: isStatic,
    future: true,
    argument: null,
  });
  
  var instance = isStatic ? Type : new Type();
  instance.readOnlyWithDefault = 42;
  assert(instance.readOnlyWithDefault == 42);

  objectEx.defineProperty(target, 'readOnlyWithDefault2', {
    static: isStatic,
    future: true,
    argument: null,
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.readOnlyWithDefault2 === null);

  objectEx.defineProperty(target, 'readOnlyFunc', {
    static: isStatic,
    function: true,
    future: true,
    writeOnce: true,
  });
  
  var instance = isStatic ? Type : new Type();
  assertThrows(() => instance.readOnlyFunc());
  instance.readOnlyFunc = 42;
  assert(instance.readOnlyFunc() == 42);

  objectEx.defineProperty(target, 'readOnlyFuncWithDefault', {
    static: isStatic,
    function: true,
    future: true,
    argument: null,
  });
  
  var instance = isStatic ? Type : new Type();
  instance.readOnlyFuncWithDefault = 42;
  assert(instance.readOnlyFuncWithDefault() == 42);

  objectEx.defineProperty(target, 'readOnlyFuncWithDefault2', {
    static: isStatic,
    function: true,
    future: true,
    argument: null,
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.readOnlyFuncWithDefault2() === null);
}
testFuture(false);
testFuture(true);

function testExternal() {
  function A() { }
  A.i = 0;
  A.generate = () => A.i++;

  var foo = 'foo';
  var target = A.prototype;
  objectEx.defineProperty(target, foo, {
    external: function(name, info) {
      assert(name == foo);
      assert(info == target);
      var ctor = info.constructor;
      return ctor.generate;
    },
    future: true,
    get: null
  });

  var a = new A();
  assert(a[foo] == 0); // patches with new stub/caches
  assert(a[foo] == 0); // hits cache
  assert(A.i == 1); // hits cache, so shouldn't increment
}
testExternal();

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
//testStatic(); TODO: Implement bind

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
  Type[setterName] = 0;
  assert(field == 0);
  field == 1;
  assert(Type[setterSym] = 1);

  assert(fieldName in Type && fieldSym in Type);
  assert(Type[fieldName] === 42);
  assert(Type[fieldSym] === 42);
  Type[fieldName] = 0;
  assert(Type[fieldName] == 0);
  Type[fieldSym] = 1;
  assert(Type[fieldName] == 1);
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

  var target = Type.prototype;
  objectEx['define' + (isFunc ? 'Function' : 'Accessor')](
    target, 'foo', {
      external: function(stubName, info) {
        assert(info == target);
        var ctor = info.constructor;
        return function () { 
          return {
            name: stubName, 
            this: this, 
            ctor: ctor,
            counter: counter++
          }
        };
      },
      future: true,
      configurable: false,
      [isFunc ? 'value' : 'get']: null
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

function testDefineReference() {
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
  objectEx.setLazyAccessor(target, 'foo', { get: resolveOwnProperty, writeOnce: true });
  objectEx.setLazyAccessor(target, 'bar', { get: resolveOwnProperty, argument: defaultAddress });
  objectEx.setLazyAccessor(target, 'baz', { get: resolveOwnProperty, argument: defaultAddress });

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
testDefineReference();

function testExtension() {
  function MyObject() { };
  var myObjectPrototype = new MyObject();

  // extensions on myObjectPrototype are written to Node.prototype
  function Node() { };
  Node.prototype = myObjectPrototype;
  Node.prototype.constructor = Node;

  function Bar() { };
  Bar.prototype = new Node();
  Bar.prototype.constructor = Bar;

  function Moo() { };
  Moo.prototype = new Bar();
  Moo.prototype.constructor = Moo;

  function Baz() { };
  Baz.prototype = new Node();
  Baz.prototype.constructor = Baz;

  function IFoo() { throw 'abstract'; };
  Object.defineProperty(IFoo, Symbol.hasInstance, {
    value: function(x) { 
      var isBar = x instanceof Bar;
      var isMoo = x instanceof Moo;
      return isBar || isMoo;
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

  var moo = new Moo();
  assert(moo[methodEx](42) == 42);
  assert(moo[methodEx](43) == 43);

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

function testMap() {
  var iface = {
    foo: Symbol('foo'),
    bar: Symbol('bar'),
  }
  
  var target = objectEx.defineProperties({ }, {
    foo: 'foo',
    bar: { get: 'bar' }
  }, { map: iface });

  assert(target[iface.foo]() == 'foo');
  assert(target[iface.bar] == 'bar');
}
//testMap() 

require('./theory');