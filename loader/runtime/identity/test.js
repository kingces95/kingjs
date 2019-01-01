'use strict';

var { stamp, scan } = require('.');
var testRequire = require('../../..');
var assert = testRequire('@kingjs/assert')
var assertThrows = testRequire('@kingjs/assert-throws')

function readMe() {
  function Foo() { };

  var id = stamp(Foo, 'Foo');
  assert(scan(id) == Foo);
  
  assertThrows(stamp(Foo));
}
readMe();