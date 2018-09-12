'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var tree = test.tree;

  if (test.treeNested) {
    tree = { [test.name]: tree };

    if (test.frozen)
      Object.freeze(tree);
  }

  var paths = null;
  if (test.hasPath)
    paths = x => x + 'path';

  if (test.pathNested)
    paths = { [test.name]: paths };

  var result = update(tree, paths, test.copyOnWrite);

  if (test.pathNested) {

    if (test.treeNested) {
      assert(Object.isFrozen(result) == test.frozen);

      result = result[test.name];

      if (test.hasPath)
        assert(result == test.tree + 'path');
      else
        assert(result === test.tree);
    }
    else {

    }

  } else {
  }

}, {
  name: 'foo',
  tree: [ undefined, null, 0, 1 ],
  treeNested: [ true, false ],
  frozen: [ false, true ],
  copyOnWrite: [ false, true ],
  hasPath: [ false, true ],
  pathNested: [ true, false ]
}, 16);