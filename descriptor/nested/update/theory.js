'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isObject = testRequire('@kingjs/is-object');

var context = { };

assertTheory(function(test, id) {
  var tree;
  if (test.hasTree) {
    tree = test.treeValue;

    if (test.treeNested) {
      tree = { [test.name]: tree };

      if (test.frozen)
        Object.freeze(tree);
    }
  }

  var paths;
  if (test.hasPath) {
    paths = test.pathValue;

    if (test.pathNested) 
      paths = { [test.wildPath ? '*' : test.name]: test.pathValue }
  }

  var expected = test.treeValue;

  function callback(leaf, path) {
    assert(context === this);
    assert(path === test.pathValue);
    assert(leaf === (test.pathNested ? test.treeValue : tree));

    return expected = test.returnLeft ? leaf : path;
  }

  var result = update(
    tree, paths, callback, context,
  test.copyOnWrite);

  if (!test.hasTree) {
    assert(result === undefined);
  } 
  else if (!test.hasPath) {
    assert(result === tree);
  } 
  else {

    var actual = result;
    if (test.pathNested == test.treeNested) {
      if (test.treeNested) {
        assert(isObject(result));

        actual = actual[test.name];
        var write = actual !== test.treeValue;
        assert(!test.frozen || (Object.isFrozen(result) == !write));

        var copied = result !== tree;
        assert((write && (test.frozen || test.copyOnWrite)) == copied);
      }
      assert(actual === expected);
    }
    else if (test.treeNested) {
      assert(actual === expected);
    } 
    else {
      assert(actual === tree);
    }
  }  
}, {
  name: 'foo',
  wildPath: [ false, true ],
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  hasTree: [ false, true ],
  treeValue: [ null, 0, 1 ],
  treeNested: [ true, false ],
  hasPath: [ false, true ],
  pathValue: [ null, 0, 1 ],
  pathNested: [ true, false ],
  returnLeft: [ true, false ]
});