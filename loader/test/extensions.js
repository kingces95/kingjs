'use strict';

var createLoader = require('../js/create');

var testRequire = require('../..');
var is = testRequire('@kingjs/is');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

var Source = {
  interfaces: { IFoo: { } },
  classes: { Foo: { implements: [ 'IFoo' ] } },
  methods: { baz: { func: 'this', extends: 'IFoo' } }
};

function testCallExtension() {

  var loader = createLoader(Source);

  var FooType = loader.resolve('Foo');
  var Foo = FooType.load();
  var foo = new Foo();
  
  var bazInfo = loader.resolve('baz');
  var bazId = bazInfo.id;
  assert(foo[bazId]() == foo);

  var IFooType = loader.resolve('IFoo');
  assert(bazInfo.extends == IFooType);
  assert(FooType.implements[0] == IFooType);
  assert(FooType.canCastTo(IFooType));
}
testCallExtension();

function testExtendable() {

  var loader = createLoader(Source);

  // Extendable is declared by default
  var ExtendableType = loader.resolve('Extendable');
  assert(ExtendableType);
  var Extendable = ExtendableType.load();
  var extendable = new Extendable();
  assert(extendable instanceof Object);

  // Extendable is not shared between loaders
  var loaderAlt = createLoader(Source);
  var ExtendableTypeAlt = loaderAlt.resolve('Extendable');
  assert(ExtendableTypeAlt != ExtendableType);

  // everything Loaded by loader derives from Extendable
  var FooType = loader.resolve('Foo');
  var Foo = FooType.load();
  assert(FooType.canCastTo(ExtendableType));
  var foo = new Foo();
  assert(foo instanceof Extendable);

  // extensions live on Extendable.prototype
  var bazInfo = loader.resolve('baz');
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

