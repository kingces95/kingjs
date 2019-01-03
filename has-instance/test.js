'use strict';

var hasInstance = require('.');
var assert = require('assert')
var identityId = require('@kingjs/identity');
var polymorphismsId = require('@kingjs/polymorphisms');

function readMe() {
  function IFoo() { }
  IFoo.prototype = null;
  IFoo[identityId] = Symbol('IFoo')
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  function IBar() { }
  IBar.prototype = null;
  IBar[identityId] = Symbol('IBar')
  IBar.bar = Symbol('bar');
  Object.defineProperty(IBar, Symbol.hasInstance, { value: hasInstance });

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[polymorphismsId] = {
    [IFoo[identityId]]: IFoo,
    [IBar[identityId]]: IBar,
  }

  var fooBar = new FooBar();
  var isIFoo = fooBar instanceof IFoo; // true
  var isIBar = fooBar instanceof IBar; // true
  
  assert(isIFoo);
  assert(isIBar);
}
readMe();

function testTypes() {
  function IFoo() { }
  IFoo.prototype = null;
  IFoo[identityId] = Symbol('IFoo')
  IFoo.foo = Symbol('foo');
  Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

  Array[polymorphismsId] = {
    [IFoo[identityId]]: IFoo
  };

  String[polymorphismsId] = {
    [IFoo[identityId]]: IFoo
  };

  Function[polymorphismsId] = {
    [IFoo[identityId]]: IFoo
  };

  assert([] instanceof IFoo);
  assert('' instanceof IFoo);
  assert(function() { } instanceof IFoo);
}
testTypes();