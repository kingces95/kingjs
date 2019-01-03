'use strict';

var polymorphismsId = require('.');
var assert = require('assert')
var identityId = require('@kingjs/identity');
var is = require('@kingjs/is')

function readMe() {
    
  function IFoo() { }
  IFoo.prototype = null;
  var IFooId = IFoo[identityId] = Symbol('IFoo')
  IFoo.foo = Symbol('foo');

  function IBar() { }
  IBar.prototype = null;
  var IBarId = IBar[identityId] = Symbol('IBar')
  IBar.bar = Symbol('bar');

  function FooBar() { }
  FooBar.prototype[IFoo.foo] = 'foo';
  FooBar.prototype[IBar.bar] = 'bar';
  FooBar[polymorphismsId] = {
    [IFoo[identityId]]: IFoo,
    [IBar[identityId]]: IBar,
  }

  var isIFoo = IFooId in FooBar[polymorphismsId]; // true
  var isIBar = IBarId in FooBar[polymorphismsId]; // true

  assert(isIFoo);
  assert(isIBar);
}
readMe();

function testNotGlobal() {
  assert(is.undefined(Symbol.keyFor(polymorphismsId)));
}
testNotGlobal();