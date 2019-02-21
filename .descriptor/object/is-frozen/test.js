'use strict';

var isFrozen = require('.');

var assert = require('assert');
var symbol = require('@kingjs/descriptor.object.writable-symbol');

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
