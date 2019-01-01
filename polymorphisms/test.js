'use strict';

var polymorphismsId = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var identityId = testRequire('@kingjs/identity');

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