'use strict';

var hasInstance = require('..');
var assert = require('assert')

var Identity = Symbol.for('@kingjs/Identity');
var Polymorphisms = Symbol.for('@kingjs/Polymorphisms');

function readMe() {
  function IFoo() { }
  IFoo.prototype = null;
  IFoo[Identity] = Symbol('IFoo')
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  function IBar() { }
  IBar.prototype = null;
  IBar[Identity] = Symbol('IBar')
  IBar.bar = Symbol('bar');
  Object.defineProperty(IBar, Symbol.hasInstance, { value: hasInstance });

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[Polymorphisms] = {
    [IFoo[Identity]]: IFoo,
    [IBar[Identity]]: IBar,
  }

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
  IFoo[Identity] = Symbol('IFoo')
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  Array[Polymorphisms] = {
    [IFoo[Identity]]: IFoo
  };

  String[Polymorphisms] = {
    [IFoo[Identity]]: IFoo
  };

  Function[Polymorphisms] = {
    [IFoo[Identity]]: IFoo
  };

  assert([] instanceof IFoo);
  assert('' instanceof IFoo);
  assert(function() { } instanceof IFoo);
}
testTypes();