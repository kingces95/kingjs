'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

var propertyName = 'foo';

assertTheory(function(test, id) {

  var name = test.name;
  
  var left = { };
  var right = { };

  if (test.hasLeft)
    left[name] = test.left;

  if (test.hasRight)
    right[name] = test.right;

  if (test.frozen)
    Object.freeze(left);

  if (test.inherited)
    right = Object.create(right);

  var thisArg = { };

  var func = function() {
    return merge.call(
      left,
      right,
      test.resolver,
      thisArg
    )
  }

  var isConflicting =
    test.hasLeft && test.hasRight && 
    test.left !== test.right &&
    test.left !== undefined;

  if (isConflicting && test.resolver == this.resolver.none)
    return assertThrows(func);

  var result = func();
  
  var implicitWrite =
    (!test.hasLeft && test.hasRight) ||
    (test.hasLeft && test.left === undefined && 
     test.hasRight && test.right !== undefined);

  var copyOnWrite = test.frozen;
  var write = implicitWrite ||
    (isConflicting && test.resolver == this.resolver.different);
    
  assert((write && copyOnWrite) == (result != left));

  if (write)
    assert(result[name] == test.right);
  else
    assert(!test.hasLeft || result[name] == test.left);

  if (copyOnWrite) {
    assert(!test.hasLeft || left[name] == test.left);
    assert(test.hasLeft || name in left == false);
  } else {
    assert(result == left);
  }

  assert(Object.isFrozen(result) == (test.frozen && !write));
}, {
  name: propertyName,
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  hasLeft: [ true, false ],
  hasRight: [ true, false ],
  frozen: [ false, true ],
  inherited: [ false, true ],
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
