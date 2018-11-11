'use strict';

var remove = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');

assertTheory(function(test, id) {

  var descriptor = test.array ? [ ] : { };
  var length = 0;
  var hasSecondValue = false;
  if (test.hasValue) {
    descriptor[test.name] = test.value;
    length++;

    if (test.hasSecondValue) {
      descriptor[test.secondName] = test.secondValue;
      hasSecondValue = true;
      length++;
    }
  }

  var result = remove.call(descriptor, test.name);
  assert(result instanceof Array == test.array);

  var copied = result != descriptor;

  if (test.array) {
    assert(!length || (result.length == length - 1));
    assert(!hasSecondValue || (result[0] == test.secondValue));
  } else {
    assert(test.name in result == false);
    assert(!hasSecondValue || (result[test.secondName] == test.secondValue))
  }

  var written = test.hasValue;
  var frozen = test.freeze;
  assert(copied == written);
  assert(isFrozen.call(result));

}, {
  name: '0',
  secondName: '1',
  array: [ true, false ],
  hasValue: [ true, false ],
  value: [ undefined, null, 0, 1 ],
  hasSecondValue: [ false, true ],
  secondValue: [ undefined, null, 0, 1 ],
})
