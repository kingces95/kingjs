'use strict';

var write = require('.');
var testRequire = require('..');

var testRequire = require('..');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');
var Dictionary = testRequire('@kingjs/dictionary');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var source = test.array ? [ ] : new Dictionary();
  
  if (test.defined)
    source[test.name] = test.value;

  var result = write.call(
    source, test.name, test.delta
  )

  assert(Object.isFrozen(result));
  assert(isFrozen.call(result));
  assert(source instanceof Array == result instanceof Array);
  assert(source[test.name] === (!test.defined ? undefined : test.value));

  var copied = source !== result;
  var written = !test.defined || test.value !== test.delta;
  assert(copied == written);  

  var actualSource = source[test.name];
  var expectedSource = test.defined ? test.value : undefined;
  assert(actualSource === expectedSource);

  var actualResult = result[test.name];
  var expectedResult = test.delta;
  assert(actualResult === expectedResult);
}, {
  name: [ '0' ],
  defined: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  delta: [ undefined, null, 0, 1 ],
  array: [ false, true ]
});

