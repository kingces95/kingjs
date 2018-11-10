'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');
var write = testRequire('@kingjs/descriptor.write');
var isFrozen = testRequire('@kingjs/descriptor.is-frozen');

var propertyName = '0';

assertTheory(function(test, id) {

  var name = test.name;
  
  var left = test.leftArray ? [ ] : { };
  var right = test.rightArray ? [ ] : { };

  if (test.hasLeft)
    left[name] = test.left;

  if (test.hasRight)
    right[name] = test.right;

  assert(isFrozen.call(left));
  if (!test.frozen) {
    left = write.call(left, 'cloneMe', { });
    assert(!isFrozen.call(left));
  }

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

  var copyOnWrite = test.frozen;
  var written = implicitWrite ||
    (isConflicting && test.resolver == this.resolver.different);
    
  assert((written && copyOnWrite) == (result != left));

  if (written)
    assert(result[name] == test.right);
  else
    assert(!test.hasLeft || result[name] == test.left);

  if (copyOnWrite) {
    assert(!test.hasLeft || left[name] == test.left);
    assert(test.hasLeft || name in left == false);
  } else {
    assert(result == left);
  }

  assert(isFrozen.call(result) == (test.frozen && !written));
}, {
  name: propertyName,
  leftArray: [ false, true ],
  rightArray: [ false, true ],
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  hasLeft: [ true, false ],
  hasRight: [ true, false ],
  frozen: [ false, true ],
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
