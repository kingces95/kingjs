'use strict';

var write = require('.');
var testRequire = require('..');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var snapshot = testRequire('@kingjs/descriptor.snapshot');

assertTheory(function(test, id) {

  var version = snapshot();

  var source = new Dictionary();
  
  if (test.defined) {
    source = write.call(
      source, test.name, test.delta, version
    );
  }

  if (test.inherited)
    source = Object.create(source);

  if (test.frozen)
    Object.freeze(source);

  if (test.copyOnWrite)
    version = snapshot();

  var result = write.call(
    source, test.name, test.delta, version
  )

  var copyOnWrite = Object.isFrozen(source) || test.copyOnWrite;
  var copied = source !== result;

  var didWrite = !test.defined || test.value !== test.delta;
  assert(copied == (copyOnWrite && didWrite));  
  assert(Object.isFrozen(result) == (test.frozen && !didWrite));

  var actual = result[test.name];
  var expected = test.delta;
  assert(actual === expected);

}, {
  name: [ 'foo' ],
  inherited: [ false, true ],
  defined: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ]
});

