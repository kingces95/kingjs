'use strict';

var write = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var isEnumerable = testRequire('@kingjs/is-enumerable');
var snapshot = testRequire('@kingjs/descriptor.snapshot');

function readMe() {

  function increment(version) {
    var thisUpdated = this;

    for (var name in thisUpdated) {
      var value = this[name] + 1;
      thisUpdated = write.call(thisUpdated, name, value, version);
    }

    return thisUpdated;
  }
  
  var target = {
    x: 0,
    y: 1,
  }
  
  var version = snapshot();
  var result = increment.call(target, version);
  
  assert(result != target);
  assert(Object.isFrozen(result) == false);
  assert(result.x == 1);
  assert(result.y == 2);
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