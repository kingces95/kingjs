'use strict';

var identityId = require('.');
var assert = require('assert');
var is = require('@kingjs/is');

function readMe() {  
  function Foo() { }
  Foo[identityId] = Symbol('Foo');

  assert(is.symbol(identityId));
}
readMe();

function testNotGlobal() {
  assert(is.undefined(Symbol.keyFor(identityId)));
}
testNotGlobal();
