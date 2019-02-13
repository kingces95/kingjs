'use strict';

var merge = require('.');

var assert = require('assert');
var assertThrows = require('@kingjs/assert-throws');
var assertTheory = require('@kingjs/assert-theory');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

var propertyName = '0';

assertTheory(function(test, id) {

  var name = test.name;
  
  var left = test.leftArray ? [ ] : { };
  var right = test.rightArray ? [ ] : { };

  if (test.hasLeft)
    left[name] = test.left;

  if (test.hasRight)
    right[name] = test.right;

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

  assert(result instanceof Array == test.leftArray);
  
  var implicitWrite =
    (!test.hasLeft && test.hasRight) ||
    (test.hasLeft && test.left === undefined && 
     test.hasRight && test.right !== undefined);

  var written = implicitWrite ||
    (isConflicting && test.resolver == this.resolver.different);
    
  var copied = result != left;
  assert(written == copied);

  if (written)
    assert(result[name] == test.right);
  else
    assert(!test.hasLeft || result[name] == test.left);

  assert(!test.hasLeft || left[name] == test.left);
  assert(test.hasLeft || name in left == false);

  assert(isFrozen.call(result));
}, {
  name: propertyName,
  leftArray: [ false, true ],
  rightArray: [ false, true ],
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  hasLeft: [ true, false ],
  hasRight: [ true, false ],
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
