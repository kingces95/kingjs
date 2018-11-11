'use strict';

var isFrozen = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var symbol = testRequire('@kingjs/descriptor.object.writable-symbol');

function readMe() {
  var target = { x:0 };
  assert(isFrozen.call(target));

  target[symbol] = undefined;
  assert(!isFrozen.call(target));

  delete target[symbol];
  assert(isFrozen.call(target));
}
readMe();

//require('./theory')
