'use strict';

var write = require('.');
var testRequire = require('..');

var testRequire = require('..');
var freeze = testRequire('@kingjs/descriptor.freeze');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var source = test.array ? [ ] : new Dictionary();
  
  if (test.defined)
    source[test.name] = test.value;

  if (test.descriptorFrozen)
    freeze.call(source);

  if (test.frozen)
    Object.freeze(source);

  assert(isFrozen.call(source));

  var result = write.call(
    source, test.name, test.delta
  )

  assert(source instanceof Array == result instanceof Array);

  var copied = source !== result;
  var frozen = test.descriptorFrozen || test.frozen;
  assert(Object.isFrozen(result) == (frozen && !copied));
  assert(isFrozen.call(result) == !copied);

  var didWrite = !test.defined || test.value !== test.delta;
  assert(copied == didWrite);  
  assert(!didWrite || !isFrozen.call(result));

  var actualSource = source[test.name];
  var expectedSource = test.defined ? test.value : undefined;
  assert(actualSource === expectedSource);

  var actualResult = result[test.name];
  var expectedResult = test.delta;
  assert(actualResult === expectedResult);

  if (!isFrozen.call(result)) {
    freeze.call(result);
    assert(isFrozen.call(result));
  }

}, {
  name: [ '0' ],
  defined: [ true, false ],
  frozen: [ false, true ],
  descriptorFrozen: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ],
  array: [ false, true ]
});

