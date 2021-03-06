'use strict';

var write = require('.');



var clone = require('@kingjs/descriptor.object.clone');
var freeze = require('@kingjs/descriptor.object.freeze');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');
var Dictionary = require('@kingjs/dictionary');
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var source = test.array ? [ ] : new Dictionary();
  assert(isFrozen.call(source));
  
  if (test.defined)
    source[test.name] = test.value;

  if (test.clone) {
    source = clone.call(source);
    assert(!isFrozen.call(source));
  }

  if (test.frozen) {
    freeze.call(source);
    assert(isFrozen.call(source));
  }

  var result = write.call(
    source, test.name, test.delta
  )

  assert(source instanceof Array == result instanceof Array);

  var copied = source !== result;
  var wasFrozen = !test.clone || test.frozen;
  var written = !test.defined || test.value !== test.delta;
  assert(copied == (written && wasFrozen));  
  assert(isFrozen.call(result) == !written);
  assert(Object.isFrozen(result) == (test.frozen && !written));

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
  cloned: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ],
  array: [ false, true ]
});

