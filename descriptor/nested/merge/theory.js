'use strict';

var nestedMerge = require('.');
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
      return nestedMerge(left, right, resolver);
      
    var target = { value: left };
    var copyOnWrite = false;
    var isFrozen = test.nested == this.nested.yesAndFrozen;
    if (isFrozen)
      target = Object.freeze(target);
    else
      copyOnWrite = true;

    var source = { value: right };

    var result = nestedMerge(
      target, 
      source, 
      { value: resolver },
      copyOnWrite
    );

    var isUpdated = target.value !== source.value && source.value !== undefined;
    assert(((copyOnWrite || isFrozen) && isUpdated) == (result != target));
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
    -1)
  );

}, {
  nested: {
    no: 'no',
    yes: 'yes',
    yesAndFrozen: 'yesAndFrozen',
    yesAndCopyOnWrite: 'yesAndCopyOnWrite'
  },
  left: [ undefined, null, 0, 1, { } ],
  right: [ undefined, null, 0, 1, { } ],
  resolver: {
    none: undefined,
    resolve: function(x, y) { return -1; },
  }
});
