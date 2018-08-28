'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

var frozen = Object.freeze({ value: 0 });
var thawed = Object.create(frozen);
Object.defineProperty(thawed, 'value', { writable: true })
thawed.value = 1;

assertTheory(function(test, id) {

  var left = test.left;
  var right = test.right;
  var resolver = test.resolver;

  var mergeTest = function() {
    if (!test.nested) 
      return merge(left, right, resolver);
      
    var target = { value: left };
    if (test.nested == this.nested.yesAndFrozen)
      target = Object.freeze(target);

    return merge(
      target, 
      { value: right }, 
      { value: resolver }
    );
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
  // defined: { 
  //   left: 'left',
  //   right: 'right',
  //   both: 'both'
  // },
  nested: {
    no: 'no',
    yes: 'yes',
    yesAndFrozen: 'yesAndFrozen'
  },
  left: [ undefined, null, 0, 1, { } ],
  right: [ undefined, null, 0, 1, { } ],
  resolver: {
    none: undefined,
    resolve: function(x, y) { return -1; },
  }
}, 32);

function baseCase() {
  var result = merge();
  assert(result === undefined);

  result = merge(0);
  assert(result == 0);

  result = merge(undefined, 0);
  assert(result == 0);

  result = merge(0, 1, function(target, source) {
    assert(target == 0);
    assert(source == 1);
    return 2;
  });
  assert(result == 2);

  assertThrows(function() { merge(0, 1); });
  assertThrows(function() { merge(0, { }, { }); });
  assertThrows(function() { merge({ }, 1, { }); });
}
baseCase();

function newObject() {

  var result = merge(null, { x: 0 }, { x: null });
  assert(result.x == 0);

  result = merge(undefined, { x: 0 }, { x: null });
  assert(result.x == 0);
}
newObject();
return;

function createVsCopy() {
  var b = { value: 0, name: 'b' };
  var a = { b: b, name: 'a' };

  var aCopy = merge(undefined, a, { b: merge });
  assert(aCopy != a);
  assert(aCopy.b == b);

  var aCopy = merge(undefined, a, { b: { value: merge } });
  assert(aCopy != a);
  assert(aCopy.b != b);  
  assert(aCopy.b.value == 0);  
}
createVsCopy();

function recursive() {

  var result = merge({
    a0: 0,
    a1: 0,
    a2: 0,
    a3: { b0: 0 },
    a4: { b0: 0, b1: 0, b2: 0 },
    a5: { b0: 0 }
  }, { 
    a0: 1,
    a1: 1,
    a3: { b0: 1 },
    a4: { b0: 1, b1: 1 }
  }, {
    a0: merge,
    a2: merge,
    a4: { b0: merge, b2: merge },
    a5: { b0: merge }
  });

  assert(result.a0 == 1);
  assert(result.a2 == 0);
  assert(result.a1 == 0);
  assert(result.a3.b0 == 0);
  assert(result.a4.b0 == 1);
  assert(result.a4.b1 == 0);
  assert(result.a4.b2 == 0);
  assert(result.a3.b0 == 0);

}
recursive();
