'use strict';

var scorch = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function (test, id) { 
  var value = { };
  if (test.hasValue) {
    value.value = test.value;

    if (test.inherited) {
      value = Object.create(value);

      if (test.hasInheritedValue)
        value.value = test.inheritedValue;
    }
  }

  if (test.frozen)
    Object.freeze(value);

  var result = scorch.call(value, test.copyOnWrite);  

  var undefinedValue = test.hasValue && test.value === undefined;
  if (test.hasValue && test.inherited && test.hasInheritedValue)
    undefinedValue = test.inheritedValue === undefined;

  assert('value' in result == (result.value !== undefined));
  assert('value' in result == (test.hasValue && !undefinedValue));

  var copied = result !== value;
  assert(copied == (
    (test.copyOnWrite || test.frozen || test.inherited) && undefinedValue
  ));
  
}, {
  copyOnWrite: [ false, true ],
  hasValue: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  inherited: [ false, true ],
  hasInheritedValue: [ false, true ],
  inheritedValue: [ undefined, null, 0, 1 ],
  frozen: [ false, true ],
})