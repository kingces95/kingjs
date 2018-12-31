'use strict';

var testRequire = require('../..');
var is = testRequire('@kingjs/is');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var loader = require('..');

var Source = {
  interfaces: { IFoo: { } },
  classes: { Foo: { implements: [ 'IFoo' ] } },
  methods: { baz: { func: 'this', extends: 'IFoo' } }
};

function testCallExtension() {

  var myLoader = loader.fork(Source);

  var FooType = myLoader.resolve('Foo');
  var Foo = FooType.load();
  var foo = new Foo();
  
  var bazInfo = myLoader.resolve('baz');
  var bazId = bazInfo.id;
  assert(foo[bazId]() == foo);

  var IFooType = myLoader.resolve('IFoo');
  assert(bazInfo.extends == IFooType);
  assert(FooType.implements[0] == IFooType);
  assert(FooType.canCastTo(IFooType));
}
testCallExtension();

function testExtendable() {

  var myLoader = loader.fork(Source);

  // Extendable is declared by default
  var ExtendableType = myLoader.resolve('Extendable');
  assert(ExtendableType);
  var Extendable = ExtendableType.load();
  var extendable = new Extendable();
  assert(extendable instanceof Object);

  // Extendable is not shared between loaders
  var loaderAlt = loader.fork(Source);
  var ExtendableTypeAlt = loaderAlt.resolve('Extendable');
  assert(ExtendableTypeAlt != ExtendableType);

  // everything Loaded by loader derives from Extendable
  var FooType = myLoader.resolve('Foo');
  var Foo = FooType.load();
  assert(FooType.canCastTo(ExtendableType));
  var foo = new Foo();
  assert(foo instanceof Extendable);

  // extensions live on Extendable.prototype
  var bazInfo = myLoader.resolve('baz');
  var bazId = bazInfo.id;
  var target = Extendable.prototype;
  var descriptor = Object.getOwnPropertyDescriptor(target, bazId);
  assert(descriptor);
  assert(!descriptor.enumerable);
  assert(!descriptor.configurable);
  assert(!descriptor.writable);

  // assert this matches extended type in stub...
  assert(is.function(extendable[bazId]));
  assertThrows(() => extendable[bazId]());

  // ...not in the function itself
  var baz = bazInfo.load();
  assert(baz.call(extendable) == extendable);
}
testExtendable();

