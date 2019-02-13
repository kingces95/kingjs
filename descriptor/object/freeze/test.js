'use strict';

var freeze = require('.');

var assert = require('assert');
var symbol = require('@kingjs/descriptor.object.writable-symbol');

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
