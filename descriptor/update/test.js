'use strict';

var update = require('.');
var testRequire = require('..');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {

  var makeEven = update.define(
    function(target) {
      for (var name in this) {
        var value = this[name];
        if (value % 2 == 0)
          continue;
        
        target = update.call(
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

  var func = update.define(
    function(target, arg) {
      assert(arg == argValue);
      return target;
    }, 1
  );

  func.call({ }, argValue, false);
}
args();

function sanity() {
  var isEnumerable = Object.prototype.propertyIsEnumerable;

  var base = { x: 0 };
  var baseEnumerable = isEnumerable.call(base, 'x');
  assert(baseEnumerable);

  var inherited = Object.create(base);
  assert(inherited.x == 0);

  // only tests ownProperties apparently
  var inheritedEnumerable = isEnumerable.call(inherited, 'x');
  assert(!inheritedEnumerable);
}
sanity();

assertTheory(function(test, id) {

  var source = new Dictionary();

  if (test.defined) {
    Object.defineProperty(source, test.name, {
      value: test.value,
      enumerable: test.enumerable,
      writable: true,
      configurable: true
    });
  }

  if (test.inherited)
    source = Object.create(source);

  if (test.frozen)
    Object.freeze(source);

  var func = update.define(
    function(target) {
      target = update.call(
        this, target, test.name, test.delta
      );
      return target;
    }, 0
  );

  var result = func.call(source, test.copyOnWrite);

  assert(
    Object.isFrozen(source) == 
    Object.isFrozen(result)
  );

  assert(test.name in result);

  assert(
    Object.prototype.propertyIsEnumerable.call(result, test.name)
  );

  var actual = result[test.name];
  var expected = test.delta;

  assert(
    actual === expected
  );

  var copyOnWrite = Object.isFrozen(source) || test.copyOnWrite;

  assert(
    (source == result) == (
      (actual === test.value && test.defined) || !copyOnWrite
    )
  )  
}, {
  name: [ 'foo' ],
  inherited: [ false, true ],
  enumerable: [ true, false ],
  defined: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ]
}, 1);

