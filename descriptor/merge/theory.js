'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

var propertyName = 'foo';

assertTheory(function(test, i) {

  var name = test.name;
  
  var left = { };
  var right = { };

  if (test.hasLeft)
    left[name] = test.left;

  if (test.hasRight)
    right[name] = test.right;

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

  var hasLeft = test.hasLeft && test.left !== undefined;
  var hasRight = test.hasRight && test.right !== undefined && test.enumerable;

  var isConflicting =
    hasLeft && hasRight &&
    test.left !== test.right;

  if (isConflicting && test.resolver == this.resolver.none)
    return assertThrows(func);

  var result = func();

  var copyOnWrite = test.frozen || test.copyOnWrite;
  var write = 
    (isConflicting && test.resolver == this.resolver.different) ||
    (!hasLeft && hasRight);
    
  assert((write && copyOnWrite) == (result != left));

  if (write)
    assert(result[name] == test.right);
  else
    assert(!hasLeft || result[name] == test.left);

  if (copyOnWrite) {
    assert(!test.hasLeft || left[name] == test.left);
    assert(test.hasLeft || name in left == false);
  } else {
    assert(result == left);
  }

  assert(!test.frozen || Object.isFrozen(result));
}, {
  name: propertyName,
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  hasLeft: [ true, false ],
  hasRight: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  inherited: [ false, true ],
  enumerable: [ false, true ],  
  resolver: {
    none: undefined,
    same: function(left, right, name) {
      assert(name == propertyName); 
      return left; 
    },
    different: function(left, right, name) {
      assert(name == propertyName);
      return right; 
    },
  },
})
