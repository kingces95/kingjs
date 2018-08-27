'use strict';

var mapPath = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {
  var accounts = {
    alice: {
      id: 0,
      balance: 101
    },
    bob: {
      id: 1,
      balance: 201
    }
  }

  var actual = mapPath.call(
    accounts,
    '*.balance',
    function(x) { return x - 1; }
  )

  assert(actual.alice.id == 0);
  assert(actual.alice.balance == 100);
  assert(actual.bob.id == 1);
  assert(actual.bob.balance == 200);
}
readMe();

function undef() {
  var result = mapPath.call({ 
    foo: undefined, 
  }, 
  '*',
  function(x) { return 1; });
  assert(result.foo == 1);
}
undef();

function star() {
  var result = mapPath.call({ 
    foo: 0, 
    bar: 1 
  }, 
  '*',
  function(x) { return x + 1; });
  assert(result.foo == 1);
  assert(result.bar == 2);
}
star();

function starStar() {
  var result = mapPath.call({ 
    a: {
      foo: 0, 
      bar: 1
    },
    b: {
      foo: 2, 
      bar: 3
    },
  }, 
  '*.*',
  function(x) { return x + 1; });
  assert(result.a.foo == 1);
  assert(result.a.bar == 2);
  assert(result.b.foo == 3);
  assert(result.b.bar == 4);
}
starStar();

function missing() {
  var target = { };
  assert(mapPath.call(target, undefined, assert) == target);
  assert(mapPath.call(target, null, assert) == target);
  assert(mapPath.call(target, [], assert) == target);
  assert(mapPath.call(target, 'missing', assert) == target);
  
  mapPath.call({ foo: 0 }, 'missing', assert);
  mapPath.call({ foo: 0 }, 'foo.*', assert);
  mapPath.call({ foo: { bar: 0 }  }, '*.foo', assert);
}
missing();

function self() {
  var target = { a: 0 };
  mapPath.call(target, '*', function(x) {
    assert(x == 0);
    assert(this == target);
  });
}
self();
