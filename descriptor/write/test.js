'use strict';

var write = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var isEnumerable = testRequire('@kingjs/is-enumerable');

function readMe() {

  function increment(copyOnWrite) {
    var thisUpdated = this;

    for (var name in thisUpdated) {
      var value = this[name] + 1;
      thisUpdated = write.call(
        this, thisUpdated, name, value, copyOnWrite
      );
    }

    return thisUpdated;
  }
  
  var target = {
    x: 0,
    y: 1,
  }
  
  var copyOnWrite = true;
  var result = increment.call(target, copyOnWrite);
  
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