'use strict';

var createInterface = require('.');
var hasInstance = require('@kingjs/has-instance');
var identityId = require('@kingjs/identity');
var polymorphismsId = require('@kingjs/polymorphisms');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var assertThrows = testRequire('@kingjs/assert-throws')
var objectEx = testRequire('@kingjs/object-ex')

var Generator = (function* protoGenerator() { }).constructor;

Object.defineProperty(
  Generator.prototype,
  Symbol.iterator, {
    configurable: true,
    get: function() { return this; },
  }
)

Object.defineProperty(
  Function.prototype,
  Symbol('getPolymorphisms'), {
    value: function() { return { }; }
  }
)

function readMe() {
  var IFoo = createInterface('IFoo', {
    members: { foo: Symbol('IFoo (custom)') }
  });

  var IBar = createInterface('IBar', {
    members: { bar: null },
    extends: [ IFoo ]
  });
  
  var isIBarIFoo = IFoo[identityId] in IBar[polymorphismsId];

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[polymorphismsId] = {
    [IFoo[identityId]]: IFoo,
    [IBar[identityId]]: IBar,
  }

  assert(IFoo[Symbol.hasInstance] == hasInstance);

  var fooBar = new FooBar();
  var isIFoo = fooBar instanceof IFoo; // true
  var isIBar = fooBar instanceof IBar; // true
  
  assert(isIBarIFoo);
  assert(isIFoo);
  assert(isIBar);
}
readMe();

function testDefineExtension() {
  var IIterable = createInterface('IIterable', {
    members: { getIterable: Symbol.iterator }
  });

  Generator[polymorphismsId] = {
    [IIterable[identityId]]: IIterable
  };

  Array[polymorphismsId] = {
    [IIterable[identityId]]: IIterable
  };

  String[polymorphismsId] = {
    [IIterable[identityId]]: IIterable
  };

  var gen = function* myGenerator() {
    yield 0;
    yield 1;
    yield 2;
  };
  var array = [0, 1, 2];
  var string = '012';

  assert(gen instanceof IIterable);
  assert(array instanceof IIterable);
  assert(string instanceof IIterable);

  function sum() {
    var iterator = this[IIterable.getIterable]();
    var result = 0;

    var next;
    while (next = iterator.next(), !next.done)
      result++;

    return result;
  }

  var sumId = Symbol('sum');

  // preforms `instanceof IIterable` check before dispatch to `sum`
  objectEx.defineFunction(
    Object.prototype, 
    sumId, {
      extends: () => IIterable,
      value: sum
    }
  );

  assert(gen[sumId]() == 3);
  assert(string[sumId]() == 3);
  assert(array[sumId]() == 3);

  // check stub throws if instance is not IIterable
  assertThrows(() => ({ })[sumId]());
}
testDefineExtension();