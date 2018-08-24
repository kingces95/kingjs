'use strict';

var augment = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

var copy = function(x, y) { return y };

function baseCase() {
  var result = augment();
  assert(result === undefined);

  result = augment(0);
  assert(result === undefined);

  result = augment(undefined, 1);
  assert(result == 1);

  result = augment(0, 1);
  assert(result == 1);

  result = augment(0, 1, function(target, source) {
    assert(target == 0);
    assert(source == 1);
    return 2;
  });
  assert(result == 2);

  result = augment(0, 1, { });
  assert(result == 0);

  result = augment(0, { }, { });
  assert(result == 0);

  result = augment(0, undefined, { bar: copy });
  assert(result == 0);

  result = augment(1, { bar: 0 }, { bar: copy });
  assert(result.bar == 0);

  result = augment(undefined, { bar: 0 }, { bar: copy });
  assert(result.bar == 0);
}
baseCase();

function recursive() {

  var result = augment({
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

function star() {

  var copy = function(x, y) { return y };

  var result = augment({ }, { a0: 1 }, { '*': copy });
  assert(result.a0 == 1);

  result = augment(
    { a0: { b0: 0, b1: 1 } }, 
    { a0: { b1: 2, b2: 3 } }, 
    { a0: { '*': copy } }
  );
  assert(result.a0.b0 == 0);
  assert(result.a0.b1 == 2);
  assert(result.a0.b2 == 3);
}
star();