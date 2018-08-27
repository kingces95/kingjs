'use strict';

var copy = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');

function baseCase() {
  var result = copy();
  assert(result === undefined);

  result = copy(0);
  assert(result == 0);

  result = copy(undefined, 1);
  assert(result == 1);

  result = copy(0, 1);
  assert(result == 1);

  result = copy(0, 1, function(target, source) {
    assert(target == 0);
    assert(source == 1);
    return 2;
  });
  assert(result == 2);
}
baseCase();

function throwsCases() {
  assertThrows(function() { copy(0, { }, { }); });
  assertThrows(function() { copy({ }, 1, { }); });
}
throwsCases();

function newObject() {

  var result = copy(null, { x: 0 }, { x: null });
  assert(result.x == 0);

  result = copy(undefined, { x: 0 }, { x: null });
  assert(result.x == 0);
}
newObject();

function createVsCopy() {
  var b = { value: 0, name: 'b' };
  var a = { b: b, name: 'a' };

  var aCopy = copy(undefined, a, { b: copy });
  assert(aCopy != a);
  assert(aCopy.b == b);

  var aCopy = copy(undefined, a, { b: { value: copy } });
  assert(aCopy != a);
  assert(aCopy.b != b);  
  assert(aCopy.b.value == 0);  
}
createVsCopy();

function recursive() {

  var result = copy({
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
    a0: copy,
    a2: copy,
    a4: { b0: copy, b2: copy },
    a5: { b0: copy }
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
