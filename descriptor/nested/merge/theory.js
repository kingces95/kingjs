'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

function assertResult(test, result, left, right) {
  var takeLeft = false;
  var takeRight = false;

  if (left === right) {
    takeLeft = true;
  } else if (left === undefined) {
    takeRight = true;
  } else if (right === undefined) {
    takeLeft = true;
  } else if (test.resolver == this.resolver.right) {
    takeRight = true;
  } else if (test.resolver == this.resolver.left) {
    takeLeft = true;
  } 

  var actual;
  if (takeLeft) {
    actual = left;
  } else if (takeRight) {
    actual = right;
  } else { 
    actual = -1;
  }

  assert(actual === result);
}

var thisArg = { };

assertTheory(function(test, id) {

  var left = test.left;
  var right = test.right;
  var resolver = test.resolver;

  var mergeTest = function() {
      
    var tree = !test.leftNested ? left :
      test.leftArray ? [ left ] : { [test.name]: left };

    var delta = !test.rightNested ? right :
      test.rightArray ? [ right ] : { [test.name]: right };
      
    var path = !test.pathNested ? resolver :
      test.pathArray ? [ resolver ] : { 
        [test.wildPath ? '*' : test.name]: resolver
      };

    if (test.leftNested && test.frozen)
      Object.freeze(tree);

    var result = merge(tree, delta, path, thisArg); 

    if (!test.pathNested) {
      assertResult.call(this, test, result, tree, delta);
      return result;
    }

    assert(test.pathNested);

    if (!test.leftNested) {
      assert(test.left === undefined);

      if (test.rightNested) {
        assert(result instanceof Array == test.pathArray);
        assert(result[test.name] === test.right);
      } else {
        assert(result == left);
        return;
      }

      return result;
    }

    assert(test.leftNested);
    assert(result instanceof Array == test.leftArray);

    var copied = result != tree;

    if (!test.rightNested) {
      assert(right === undefined);
      assert(!copied);
      assert(result[test.name] == left);
      return result;
    }

    assert(test.rightNested);

    var differentValues = tree[test.name] !== delta[test.name];
    var implicitWrite = differentValues && tree[test.name] === undefined
    var merged = differentValues && delta[test.name] !== undefined && tree[test.name] !== undefined;
    var mergeWrite = merged && 
      (resolver == this.resolver.neither ||
      resolver == this.resolver.right);
    var write = mergeWrite || implicitWrite;

    assert(write == copied);

    assertResult.call(this, test, result[test.name], left, right);
    return result;
  }

  var unexpectedTreeLeaf = test.pathNested && !test.leftNested && left !== undefined;
  var unexpectedDeltaLeaf = test.pathNested && !test.rightNested && right !== undefined;
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
  name: '0',
  leftNested: [ true, false ],
  leftArray: [ false, true ],
  rightNested: [ true, false ],
  rightArray: [ false, true ],
  pathNested: [ true, false ],
  pathArray: [ false, true ],
  frozen: [ true, false ],
  left: [ undefined, null, 0, 1 ],
  right: [ undefined, null, 0, 1 ],
  wildPath: [ false, true ],
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
