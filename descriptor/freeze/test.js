'use strict';

var freeze = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var symbol = testRequire('@kingjs/descriptor.writable-symbol');

function readMe() {
  var target = { x:0 };
  target[symbol] = undefined;

  var result = freeze.call(target);
  assert(result == target);
  assert(result.x == 0);
  assert(symbol in result == false);
  assert(Object.isFrozen(result));
}
readMe();

require('./theory')
