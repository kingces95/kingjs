'use strict';

var freeze = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

var $freeze = '$freeze';

assertTheory(function(test, id) {

  var value = test.value;
  if (test.hasValue) {
    value = { [test.name]: value };
    if (test.isFrozen)
      value.$freeze = true;

    if (test.isNested) {
      value = { [test.nestedName]: value };
      if (test.isNestedFrozen)
        value.$freeze = true;
    }
  }

  freeze(value);

  if (test.hasValue) {

    if (test.isNested) {
      var isFrozen = Object.isFrozen(value);
      assert(isFrozen == test.isNestedFrozen);
      assert($freeze in value == false);

      value = value[test.nestedName];
    }

    var isFrozen = Object.isFrozen(value);
    assert(isFrozen == (test.isFrozen && (!test.isNested || test.isNestedFrozen)));
    assert($freeze in value == (test.isFrozen && test.isNested && !test.isNestedFrozen));

    value = value[test.name];
  }

  assert(value === test.value);

}, {
  name: 'foo',
  nestedName: 'bar',
  value: [ undefined, null, 0, 1 ],
  hasValue: [ false, true ],
  isNested: [ false, true ],
  isFrozen: [ false, true ],
  isNestedFrozen: [ false, true ]
})