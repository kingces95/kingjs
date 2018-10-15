'use strict';

var write = require('.');
var testRequire = require('..');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var source = new Dictionary();
  
  if (test.defined)
    source[test.name] = test.value;

  if (test.inherited)
    source = Object.create(source);

  if (test.frozen)
    Object.freeze(source);

  var result = write.call(
    source, test.name, test.delta
  )

  var copyOnWrite = Object.isFrozen(source);
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
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ]
});

