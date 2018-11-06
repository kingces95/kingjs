'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

function assertResult(test, result, left, right) {
  assert(result === (
    left === right ? left :
    left === undefined ? right :
    right === undefined ? left :
    test.resolver == this.resolver.right ? right :
    test.resolver == this.resolver.left ? left :
    -1
  ));
}

var thisArg = { };

assertTheory(function(test, id) {

  var left = test.left;
  var right = test.right;
  var resolver = test.resolver;
  var pathNested = test.rightNested;

  var mergeTest = function() {
      
    var tree = test.leftNested ? [ left ] : left;
    var delta = test.rightNested ? [ right ] : right;

    if (test.leftNested && test.frozen)
      Object.freeze(tree);

    var result = merge(tree, delta, thisArg); 

    if (!test.pathNested) {
      assertResult.call(this, test, result, tree, delta);
      return result;
    }

    assert(pathNested);

    if (!test.leftNested) {
      assert(test.left === undefined);

      if (test.rightNested)
        assert(result.value === test.right);
      else
        assert(result === test.left);

      return result;
    }

    assert(test.leftNested);

    var copied = result != tree;

    if (!test.rightNested) {
      assert(right === undefined);
      assert(!copied);
      assert(result.value == left);
      return result;
    }

    assert(test.rightNested);

    var differentValues = tree.value !== delta.value;
    var implicitWrite = differentValues && tree.value === undefined
    var merged = differentValues && delta.value !== undefined && tree.value !== undefined;
    var mergeWrite = merged && 
      (resolver == this.resolver.neither ||
      resolver == this.resolver.right);
    var write = mergeWrite || implicitWrite;

    assert((write && test.frozen) == copied);

    assertResult.call(this, test, result.value, left, right);
    return result;
  }

  var unexpectedTreeLeaf = pathNested && !test.leftNested && left !== undefined;
  var unexpectedDeltaLeaf = pathNested && !test.rightNested && right !== undefined;
  var unexpectedLeaf = unexpectedTreeLeaf || unexpectedDeltaLeaf;
  if (unexpectedLeaf) {
    assertThrows(mergeTest);
    return;
  }

  if (!test.resolver) {
    var nodesConflict = test.leftNested && !test.rightNested && !test.pathNested;
    if (nodesConflict && test.right !== undefined) {
      assertThrows(mergeTest);
      return;
    }

    var nodesConflict = !test.leftNested && test.rightNested && !test.pathNested;
    if (nodesConflict && test.left !== undefined) {
      assertThrows(mergeTest);
      return;
    }

    var nodesConflict = test.leftNested && test.rightNested && !test.pathNested;
    if (nodesConflict) {
      assertThrows(mergeTest);
      return;
    }

    var allNested = test.leftNested && test.rightNested && test.pathNested;
    var noneNested = !test.leftNested && !test.rightNested && !test.pathNested;
    if (allNested || noneNested) {
      if (left !== right && 
        left !== undefined && 
        right !== undefined) {
        assertThrows(mergeTest);
        return;
      }
    }
  }

  mergeTest.call(this);
}, {
  leftNested: [ true, false ],
  rightNested: [ true, false ],
  frozen: [ true, false ],
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  resolver: {
    none: undefined,
    neither: function(x, y) {
      assert(this == thisArg);
      return -1; 
    },
    left: function(x, y) {
      assert(this == thisArg);
      return x; 
    },
    right: function(x, y) { 
      assert(this == thisArg);
      return y; 
    },
  }
});
