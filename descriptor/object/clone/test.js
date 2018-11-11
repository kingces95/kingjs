'use strict';

var clone = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var symbol = testRequire('@kingjs/descriptor.object.writable-symbol');

function readMe() {
  var target = { x:0 };
  var result = clone.call(target);
  assert(target != result);
  assert(target.x == 0);
  assert(result.x == 0);
  assert(symbol in result);
}
readMe();

require('./theory')
