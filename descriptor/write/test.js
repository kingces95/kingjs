'use strict';

var write = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var isEnumerable = testRequire('@kingjs/is-enumerable');

function readMe() {

  var target = {
    value: 0,
  }
   
  Object.freeze(target);

  var result = write.call(target, 'value', 1);
  
  assert(result != target);
  assert(Object.isFrozen(result) == false);
  assert(target.value == 0);
  assert(result.value == 1);
}
readMe();

function sanity() {
  var isOwnEnumerable = Object.prototype.propertyIsEnumerable;

  var base = { x: 0 };
  var baseEnumerable = isOwnEnumerable.call(base, 'x');
  assert(baseEnumerable);

  var inherited = Object.create(base);
  assert(inherited.x == 0);

  // only tests ownProperties apparently
  var inheritedEnumerable = isOwnEnumerable.call(inherited, 'x');
  assert(!inheritedEnumerable);

  inheritedEnumerable = isEnumerable.call(inherited, 'x');
  assert(inheritedEnumerable);
}
sanity();

require('./theory');