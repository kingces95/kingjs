'use strict';

var create = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function test(args, expected) {
  var enumerable = create.apply(this, args);
  var enumerator = enumerable.getEnumerator();

  var actual = undefined;
  if (enumerator.moveNext()) {
    actual = [];
    do {
      actual.push(enumerator.current);
    } while (enumerator.moveNext())
  }
  
  var actualJSON = JSON.stringify(actual);
  var expectedJSON = JSON.stringify(expected);
  
  assert(actualJSON == expectedJSON);
}
test(undefined, undefined);
test([], undefined);
test([0], [0]);
test([0, 1], [0, 1]);
