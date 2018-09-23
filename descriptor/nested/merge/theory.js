'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var left = test.left;
  var right = test.right;
  var resolver = test.resolver;

  var mergeTest = function() {
    if (!test.nested) 
      return merge(left, right, resolver);
      
    var tree = { value: left };
    var delta = { value: right };
    var path = { value: resolver };
    var thisArg = null;

    if (test.frozen)
      Object.freeze(tree);

    var result = merge(
      tree, 
      delta, 
      path,
      thisArg,
      test.copyOnWrite
    );

    var copied = result != tree;
    var differentValues = tree.value !== delta.value;
    var implicitWrite = differentValues && tree.value === undefined
    var merged = differentValues && delta.value !== undefined && tree.value !== undefined;
    var mergeWrite = merged && 
      (resolver == this.resolver.neither ||
       resolver == this.resolver.right);
    var write = mergeWrite || implicitWrite;

    assert((write && (test.copyOnWrite || test.frozen)) == copied);
    return result;
  }

  if (!test.resolver &&
      left !== right && 
      left !== undefined && 
      right !== undefined) {
    assertThrows(mergeTest);
    return;
  }
    
  var result = mergeTest.call(this);

  if (test.nested)
    result = result.value;

  assert(result === (
    left === right ? left :
    left === undefined ? right :
    right === undefined ? left :
    test.resolver == this.resolver.right ? right :
    test.resolver == this.resolver.left ? left :
    -1)
  );

}, {
  nested: [ true, false ],
  frozen: [ true, false ],
  copyOnWrite: [ true, false ],
  left: [ undefined, null, 0, 1, { } ],
  right: [ undefined, null, 0, 1, { } ],
  resolver: {
    none: undefined,
    neither: function(x, y) { return -1; },
    left: function(x, y) { return x; },
    right: function(x, y) { return y; },
  }
});
