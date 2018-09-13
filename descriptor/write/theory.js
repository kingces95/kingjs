'use strict';

var write = require('.');
var testRequire = require('..');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isEnumerable = testRequire('@kingjs/is-enumerable');

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

  var func = write.define(
    function(target) {
      target = test.clear ? write.clear.call(
        this, target, test.name
      ) : write.call(
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

  var enumerable = isEnumerable.call(result, test.name);
  assert(enumerable == !test.clear);

  var copyOnWrite = Object.isFrozen(source) || test.copyOnWrite;
  var copied = source !== result;

  if (test.clear) {
    var didWrite = test.defined && test.enumerable;
    assert(copied == (copyOnWrite && didWrite));
    return;
  } 

  var didWrite = !test.defined || test.value !== test.delta || !test.enumerable;
  assert(copied == (copyOnWrite && didWrite));  

  var actual = result[test.name];
  var expected = test.clear ? undefined : test.delta;
  assert(actual === expected);

}, {
  name: [ 'foo' ],
  inherited: [ false, true ],
  enumerable: [ true, false ],
  defined: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ],
  clear: [ false, true ]
}, 546);

