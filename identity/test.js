'use strict';

var identityId = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var is = testRequire('@kingjs/is')

function readMe() {  
  function Foo() { }
  Foo[identityId] = Symbol('Foo');

  assert(is.symbol(identityId));
}
readMe();