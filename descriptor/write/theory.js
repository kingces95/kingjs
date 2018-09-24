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

  function func() {
    var thisUpdated = this;
    thisUpdated = write.call(
      this, thisUpdated, test.name, test.delta, test.copyOnWrite
    );
    return thisUpdated;
  }

  var result = func.call(source, source, test.copyOnWrite);

  var copyOnWrite = Object.isFrozen(source) || test.copyOnWrite;
  var copied = source !== result;

  var didWrite = !test.defined || test.value !== test.delta;
  assert(copied == (copyOnWrite && didWrite));  
  assert(Object.isFrozen(result) == (test.frozen && !didWrite));

  var actual = result[test.name];
  var expected = test.delta;
  assert(actual === expected);

  var enumerable = isEnumerable.call(result, test.name);

  // this is a gotcha; descriptor logic assumes properties are enumerable and
  // makes no effort to verify or enforce that for performance reasons. 
  assert(enumerable == (test.enumerable || !test.defined || copied || (didWrite && test.inherited)));

}, {
  name: [ 'foo' ],
  inherited: [ false, true ],
  enumerable: [ true, false ],
  defined: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ]
});

