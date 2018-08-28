'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

var a = 'a';
var zero = 0;
var one = 1;

assertTheory(function(test, i) {

  var name = test.name;
  
  var left = { };
  var right = { };

  if (test.value == this.value.leftOnly) {
    left[name] = zero;

  } else if (test.value == this.value.rightOnly) {
    right[name] = one;

  } else if (test.value == this.value.same) {
    left[name] = right[name] = zero

  } else if (test.value == this.value.different) {
    left[name] = zero;
    right[name] = one;
    
  } else 
    assert();

  if (test.frozen)
    Object.freeze(left);

  if (name in right && !test.enumerable) {
    Object.defineProperty(right, name, { 
      enumerable: false
    });
  }

  if (test.inherited)
    right = Object.create(right);

  var func = function() {
    return merge.call(
      left,
      right,
      test.resolver,
      test.copyOnWrite
    )
  }

  var isConflicting =
    test.value == this.value.different &&
    test.enumerable;

  if (isConflicting && 
    test.resolver == this.resolver.none)
    return assertThrows(func);

  var result = func();

  var write = test.enumerable && (
    test.value == this.value.rightOnly || (
      (test.value == this.value.different) &&
        (test.resolver == this.resolver.none || 
         test.resolver == this.resolver.different)
    )
  );

  assert(((test.frozen || test.copyOnWrite) && write) == (result != left));
  assert(result[name] == write ? one : zero)
}, {
  name: a,
  value: {
    leftOnly: 'leftOnly',
    rightOnly: 'rightOnly',
    same: 'same',
    different: 'different'
  },
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  resolver: {
    none: undefined,
    same: function(left, right, name) {
      assert(name == a); 
      return left; 
    },
    different: function(left, right, name) {
      assert(name == a);
     return right; 
    },
  },
  inherited: [ false, true ],
  enumerable: [ false, true ]
})
