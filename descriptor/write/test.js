'use strict';

var write = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var isEnumerable = testRequire('@kingjs/is-enumerable');

function readMe() {

  var makeEven = write.define(
    function(target) {
      for (var name in this) {
        var value = this[name];
        if (value % 2 == 0)
          continue;
        
        target = write.call(
          this, target, name, value + 1
        );
      }
      return target;
    }, 0
  );
  
  var numbers = {
    x: 0,
    y: 1,
    z: 2
  }
  
  Object.freeze(numbers);
  
  var copyOnWrite = true;
  var evenNumbers = makeEven.call(numbers, copyOnWrite);
  
  assert(evenNumbers != numbers);
  assert(Object.isFrozen(evenNumbers));
  assert(evenNumbers.x == 0);
  assert(evenNumbers.y == 2);
  assert(evenNumbers.z == 2);
}
readMe();

function args() {
  var argValue = 'foo';

  var func = write.define(
    function(target, arg) {
      assert(arg == argValue);
      return target;
    }, 1
  );

  func.call({ }, argValue, false);
}
args();

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