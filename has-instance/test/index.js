'use strict';

var hasInstance = require('..');
var assert = require('assert')

var {
  Identity,
  Polymorphisms,
  addPolymorphisms,
  setIdentity
} = hasInstance;

assert(Identity);
assert(Polymorphisms);

function readMe() {
  function IFoo() { }
  IFoo.prototype = null;
  setIdentity.call(IFoo);
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  function IBar() { }
  IBar.prototype = null;
  setIdentity.call(IBar);
  IBar.bar = Symbol('bar');
  Object.defineProperty(IBar, Symbol.hasInstance, { value: hasInstance });

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  addPolymorphisms.call(FooBar, IFoo, IBar);

  var fooBar = new FooBar();
  var isIFoo = fooBar instanceof IFoo;
  var isIBar = fooBar instanceof IBar;
  
  assert(isIFoo);
  assert(isIBar);
}
readMe();

function testTypes() {
  function IFoo() { }
  IFoo.prototype = null;
  setIdentity.call(IFoo);
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  addPolymorphisms.call(Array, IFoo);
  addPolymorphisms.call(String, IFoo);
  addPolymorphisms.call(Function, IFoo);

  assert([] instanceof IFoo);
  assert('' instanceof IFoo);
  assert(function() { } instanceof IFoo);
}
testTypes();