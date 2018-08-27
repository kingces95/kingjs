'use strict';

var merge = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var takeLeft = testRequire('@kingjs/func.return-arg-0');
var takeRight = testRequire('@kingjs/func.return-arg-1');
var assertTheory = testRequire('@kingjs/assert-theory');

var value = {
  leftOnly: 'leftOnly',
  rightOnly: 'rightOnly',
  same: 'same',
  different: 'different'
};

var a = 'a';
var sameValue = 0;
var differentValue = 1;

var resolver = {
  none: undefined,
  same: function(left, right, name) {
    assert(name == a); 
    return left; 
  },
  different: function(left, right, name) {
    assert(name == a);
   return right; 
  },
}

assertTheory(function(test, i) {

  var name = test.name;
  
  var left = { };
  var right = { };

  if (test.value == value.leftOnly) {
    left[name] = sameValue;
  } else if (test.value == value.rightOnly) {
    right[name] = differentValue;
  } else if (test.value == value.same) {
    left[name] = right[name] = sameValue
  } else {
    left[name] = sameValue;
    right[name] = differentValue;
  }

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
      test.resolver
    )
  }

  var isConflicting =
    test.value == value.different &&
    test.enumerable;

  if (isConflicting && 
    test.resolver == resolver.none)
    return assertThrows(func);

  var result = func();

  var write = test.enumerable && (
    test.value == value.rightOnly || (
      (test.value == value.different) &&
        (test.resolver == resolver.none || 
         test.resolver == resolver.different)
    )
  );

  assert((test.frozen && write) == (result != left));
  assert(result[name] == write ? differentValue : sameValue)
}, {
  name: a,
  value: value,
  frozen: [ false, true ],
  resolver: resolver,
  inherited: [ false, true ],
  enumerable: [ false, true ]
})

function readMe(skipIfDefined) {

  var target = { 
    a: 0,
    b: 1, 
  };
  
  var source = { 
    b: 2,
    c: 3
  };
  
  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, source, resolve);

  assert(target == result);
  assert(Object.keys(target).length == 3);
  assert(target.a == 0);
  assert(target.b == skipIfDefined ? 1 : 2);
  assert(target.c == 3);
}
readMe(false);
readMe(true);

function conflict() {

  // conflict
  assertThrows(function() {
    merge.call(
      { a: 1 }, 
      { a: 0 }
    )
  });
  
  // conflict but same value
  var source = Object.freeze({ a: 0 });
  var result = merge.call(source, { a: 0 }, returnZero);
  assert(source == result);

  // conflict but resolved to same value
  var returnZero = function() { return 0; };
  merge.call(source, { a: 1 }, returnZero);
  assert(source == result);
}
conflict();

function missingSource() {
  var target = { };
  var result = merge.call(target);
  assert(target == result);
}
missingSource();

function uninitialized(skipIfDefined) {
  var target = { 
    a: undefined 
  };
  var source = { 
    a: 0,
    b: undefined
  };

  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, source, resolve);
  assert(Object.keys(result).length == 2);
  assert(target.a === skipIfDefined ? undefined : 0);
  assert(target.b == undefined);
}
uninitialized(false);
uninitialized(true);

function hidden(skipIfDefined) {
  var target = { };
  var source = Object.defineProperties({ }, {
    a: { value: 0 }
  });
  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, source, resolve);
  assert(Object.keys(result).length == 0);
}
hidden(false);
hidden(true);

function inherited(skipIfDefined) {
  var target = { };
  var source = { };
  Object.setPrototypeOf(source, { a: 0 });

  var resolve = skipIfDefined ? takeLeft : takeRight;
  var result = merge.call(target, source, resolve);
  assert(Object.keys(result).length == 1);
  assert(target.a == 0);
}
inherited(false);
inherited(true);

function resolveOnName() {
  var target = { a:0, b:0 };
  var source = { a:1, b:1 };

  merge.call(target, source, function(left, right, name) {
    return name == 'a' ? left : right;
  });
  assert(target.a == 0);
  assert(target.b == 1);
}
resolveOnName();