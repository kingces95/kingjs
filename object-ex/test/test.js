'use strict';

var objectEx = require('..');
var assert = require('assert');
var is = require('@kingjs/is');

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

function testLazy(isStatic) {
  function Type() { };

  if (isStatic) {
    Type.x = 1;
    Type.y = 2;
    Type.counter = 0;
  } 
  else {
    Type.prototype = { x: 1, y: 2, counter: 0 };
  }

  var withOutInit = 'this.counter++, this.x + this.y';
  var withInit = function(o) { return this.counter++, o };
  
  var target = isStatic ? Type : Type.prototype;

  objectEx.defineProperty(target, 'lazy', {
    static: isStatic,
    lazy: true,
    value: withOutInit,
  });
  
  var instance = isStatic ? Type : new Type();
  assert(instance.lazy() == 3);
  assert(instance.lazy() == 3);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'compile', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
    value: withInit
  });

  var instance = isStatic ? Type : new Type();
  assert.throws(() => instance.compile());
  instance.compile = 42;
  assert(instance.compile() == 42);
  assert(instance.compile() == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'load', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
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
    lazy: true,
    writeOnce: true,
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
    lazy: true,
    get: withOutInit
  });
  
  var instance = isStatic ? Type : new Type();
  assert(instance.computedProperty == 3);
  assert(instance.computedProperty == 3);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'ref', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
    get: withInit
  });
  
  var instance = isStatic ? Type : new Type();
  assert.throws(() => instance.ref);
  instance.ref = 42;
  assert(instance.ref == 42);
  assert(instance.counter == 1);
  target.counter = 0;

  objectEx.defineProperty(target, 'refWithDefault', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
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
    lazy: true,
    writeOnce: true,
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
    lazy: true,
    writeOnce: true,
  });
  
  var instance = isStatic ? Type : new Type();
  assert.throws(() => instance.readOnly);
  instance.readOnly = 42;
  assert(instance.readOnly == 42);

  objectEx.defineProperty(target, 'readOnlyWithDefault', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
    argument: null,
  });
  
  var instance = isStatic ? Type : new Type();
  instance.readOnlyWithDefault = 42;
  assert(instance.readOnlyWithDefault == 42);

  objectEx.defineProperty(target, 'readOnlyWithDefault2', {
    static: isStatic,
    lazy: true,
    writeOnce: true,
    argument: null,
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.readOnlyWithDefault2 === null);

  objectEx.defineProperty(target, 'readOnlyFunc', {
    static: isStatic,
    value: o => o,
    lazy: true,
    writeOnce: true,
  });
  
  var instance = isStatic ? Type : new Type();
  assert.throws(() => instance.readOnlyFunc());
  instance.readOnlyFunc = 42;
  assert(instance.readOnlyFunc() == 42);

  objectEx.defineProperty(target, 'readOnlyFuncWithDefault', {
    static: isStatic,
    value: o => o,
    lazy: true,
    writeOnce: true,
    argument: null,
  });
  
  var instance = isStatic ? Type : new Type();
  instance.readOnlyFuncWithDefault = 42;
  assert(instance.readOnlyFuncWithDefault() == 42);

  objectEx.defineProperty(target, 'readOnlyFuncWithDefault2', {
    static: isStatic,
    value: o => o,
    lazy: true,
    writeOnce: true,
    argument: null,
  });

  var instance = isStatic ? Type : new Type();
  assert(instance.readOnlyFuncWithDefault2() === null);
}
testLazy(false);
testLazy(true);

function testExternal() {
  function A() { }
  A.i = 0;
  A.generate = () => A.i++;

  var foo = 'foo';
  var target = A.prototype;
  objectEx.defineProperty(target, foo, {
    callback: function(self, name, info) {
      assert(name == foo);
      assert(info == target);
      var ctor = info.constructor;
      self.get = ctor.generate;
    },
    lazy: true
  });

  var a = new A();
  assert(a[foo] == 0); // patches with new stub/caches
  assert(a[foo] == 0); // hits cache
  assert(A.i == 1); // hits cache, so shouldn't increment
}
testExternal();


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
  assert.throws(() => target.foo);
  assert(target.foo == 0);
}
throwOnUndefined();

function stubFunctionTest(isFunc) {
  var Type = function MyType() { };
  var counter = 0;

  var target = Type.prototype;
  objectEx['define' + (isFunc ? 'Function' : 'Accessor')](
    target, 'foo', {
      callback: function(self, stubName, info) {
        assert(info == target);
        var ctor = info.constructor;
        self[isFunc ? 'value' : 'get'] = function () { 
          return {
            name: stubName, 
            this: this, 
            ctor: ctor,
            counter: counter++
          }
        };
      },
      lazy: true,
      configurable: false
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
  objectEx.setLazyAccessor(target, 'foo', { 
    get: resolveOwnProperty, 
    writeOnce: true 
  });
  objectEx.setLazyAccessor(target, 'bar', { 
    get: resolveOwnProperty, 
    writeOnce: true, 
    argument: defaultAddress 
  });
  objectEx.setLazyAccessor(target, 'baz', { 
    get: resolveOwnProperty, 
    writeOnce: true, 
    argument: defaultAddress 
  });

  assert.throws(() => target.foo);
  assert.throws(() => target.foo = undefined);
  assert(counter == 0);

  target.foo = '0';
  target.foo = '0';
  assert(counter == 0);

  target.bar = '1';
  assert(counter == 0);

  assert.throws(() => target.baz = undefined);
  assert(counter == 0);

  assert(target.foo == 42);
  assert(counter == 1);
  assert(target.foo == 42);
  assert(counter == 1);

  assert(target.bar == 43);
  assert(counter == 2);

  resolveUndefined = true;
  assert.throws(() => target.baz);
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
    Object.prototype,
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
  assert.throws(() => baz[methodEx]());

  // getter
  var getterEx = Symbol('getter');
  objectEx.defineProperty(
    Object.prototype,
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
    Object.prototype,
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

//require('./theory');