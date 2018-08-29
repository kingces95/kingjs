'use strict';

var nestedMerge = require('.');
var testRequire = require('..');
var merge = testRequire('@kingjs/descriptor.merge');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var takeRight = testRequire('@kingjs/func.return-arg-1')

function readme() {
  
  var adult = {
    wrap: 'name',
    defaults: {
      name: 'John Doe',
      age: 18
    },
    preconditions: {
      age: function isAdult(x) {
        assert(x >= 18);
        return x;
      }
    }
  }
  
  var worker = {
    defaults: {
      age: 40
    },
    preconditions: {
      age: function notRetired(x) {
        assert(x < 62);
        return x;
      }
    }
  }
  
  var copyOnWrite = true;

  function takeLeft(left, right) {
    return left;
  }
  
  function compose(left, right) {
    return function(x) {
      return right(left(x));
    }
  }
  
  var resolve = {
    wrap: takeLeft,
    defaults: function(left, right) { 
      return merge.call(left, right, takeLeft)
    },
    preconditions: function(left, right) {
      return merge.call(left, right, compose)
    }
  }
  
  nestedMerge(worker, adult, resolve, copyOnWrite);
  
  var result = nestedMerge(worker, adult, resolve, copyOnWrite);

  assert(result.wrap == 'name');
  assert(result.defaults.name == 'John Doe');
  assert(result.defaults.age == 40);
  assert(result.preconditions.age(18) == 18);
  assert(result.preconditions.age(61) == 61);
  assertThrows(function() { result.preconditions.age(17); });
  assertThrows(function() { result.preconditions.age(62); });
}
readme();

function baseCase() {
  var result = nestedMerge();
  assert(result === undefined);

  result = nestedMerge(0);
  assert(result == 0);

  result = nestedMerge(undefined, 0);
  assert(result == 0);

  result = nestedMerge(0, 1, function(target, source) {
    assert(target == 0);
    assert(source == 1);
    return 2;
  });
  assert(result == 2);

  assertThrows(function() { nestedMerge(0, 1); });
  assertThrows(function() { nestedMerge(0, { }, { }); });
  assertThrows(function() { nestedMerge({ }, 1, { }); });
}
baseCase();

function newObject() {

  var result = nestedMerge(null, { x: 0 }, { x: null });
  assert(result.x == 0);

  result = nestedMerge(undefined, { x: 0 }, { x: null });
  assert(result.x == 0);
}
newObject();

function createPaths() {
  var b = { value: 0, name: 'b' };
  var a = { b: b, name: 'a' };

  var aCopy = nestedMerge(undefined, a, { b: takeRight });
  assert(aCopy != a);
  assert(aCopy.b == b);

  var aCopy = nestedMerge(undefined, a, { b: { value: takeRight } });
  assert(aCopy != a);
  assert(aCopy.b != b);  
  assert(aCopy.b.value == 0);  
}
createPaths();

function recursive() {

  var result = nestedMerge({
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
    a0: takeRight,
    a2: takeRight,
    a4: { b0: takeRight, b2: takeRight },
    a5: { b0: takeRight }
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


require('./theory')