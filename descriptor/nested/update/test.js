'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function readMe() {

  var people = {

    alice: {
      name: 'Alice',
      follows: 'bob'
    },
    bob: {
      name: 'Bob', 
      follows: 'chris'
    },
    chris: {
      name: 'Chris',
      follows: 'alice'
    }
  };

  var result = update(
    people,
    { '*': { follows: null } },
    function(name) { return this[name]; },
    people
  )

  assert(result.alice.follows == people.bob);
  assert(result.alice.name == 'Alice');
  assert(result.bob.follows == people.chris);
  assert(result.bob.name == 'Bob');
  assert(result.chris.follows == people.alice);
  assert(result.chris.name == 'Chris');
}
readMe();

function defaultPath() {
  var result = update({
    foo: 0,
    bar: 1
  }, { '*': 'default', bar: 'specific' },
  (value, name, path) => path);

  assert(result.foo == 'default');
  assert(result.bar == 'specific');
}
defaultPath();

function twoDeep(hasStack) {
  function callback(leaf, name, path, stack) {
    assert(leaf == 'leaf');
    assert(name == 'two');
    assert(path == 'path');
    if (hasStack) {
      assert(stack.length == 1);
      assert(stack[0] == 'one');
    } else {
      assert(stack === undefined);
    }
  };

  callback.stack = hasStack;

  update({
    one: { two: 'leaf' }
  }, { 
    one: { two: 'path' }
  }, callback)
}
twoDeep(true);
twoDeep(false);

require('./theory');