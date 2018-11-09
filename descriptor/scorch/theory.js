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

  var result = scorch.call(value);  

  var undefinedValue = test.hasValue && test.value === undefined;
  if (test.hasValue && test.inherited && test.hasInheritedValue)
    undefinedValue = test.inheritedValue === undefined;

  assert('value' in result == (result.value !== undefined));
  assert('value' in result == (test.hasValue && !undefinedValue));

  var copied = result !== value;
  assert(copied == (
    (test.frozen || test.inherited) && undefinedValue
  ));
  
}, {
  hasValue: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  inherited: [ false, true ],
  hasInheritedValue: [ false, true ],
  inheritedValue: [ undefined, null, 0, 1 ],
  frozen: [ false, true ],
})

assertTheory(function (test, id) { 
  var value = [];
  for (var i = 0; i < test.length; i++)
    value[i] = i;

  if (test.first < value.length)
    value[test.first] = undefined;

  if (test.second < value.length)
    value[test.second] = undefined;

  var firstValid = test.first < value.length;
  var secondValid = test.first != test.second && test.second < value.length;

  if (test.frozen)
    Object.freeze(value);
  
  var count = 0;
  if (firstValid) count++;
  if (secondValid) count++;

  var result = scorch.call(value);  

  assert(result.length == test.length - count);

  var write = firstValid || secondValid;
  var copied = result != value;
  assert(copied == (write && test.frozen));

  for (var i = 0, j = 0; i < test.length; i++) {
    if (i == test.first)
      continue;
    if (i == test.second)
      continue;
    assert(result[j++] == i);
  }
}, {
  length: [ 0,1,2,3,4,5 ],
  first: [ 0,1,2,3,4,5 ],
  second: [ 0,1,2,3,4,5 ],
  frozen: [ false, true ],
})