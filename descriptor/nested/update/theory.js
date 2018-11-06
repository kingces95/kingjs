'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isObject = testRequire('@kingjs/is-object');

var context = { };

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested) {
    tree = test.arrayTree ? [ tree ] : { [test.name]: tree };

    if (test.frozen)
      Object.freeze(tree);
  }

  var paths = test.pathValue;
  if (test.pathNested) 
    paths = test.arrayPath ? [ test.pathValue ] :
      { [test.wildPath ? '*' : test.name]: test.pathValue }

  var expected = test.leafValue;

  function callback(leaf, path) {
    assert(context === this);

    assert(path === test.pathValue);

    if (test.pathNested == test.leafNested)
      assert(leaf === test.leafValue);
    else if (test.leafNested)
      assert(leaf === tree);
    else
      assert();

    return expected = test.returnLeaf ? leaf : path;
  }

  var treeResult = update(tree, paths, callback, context);

  if (test.pathNested && !test.leafNested) {
    assert(treeResult === test.leafValue);
    return;
  }

  if (!test.pathNested && test.leafNested) {
    var leafResult = treeResult;
    var expectedLeaf = test.returnLeaf ? tree : test.pathValue;

    assert(!isObject(treeResult) || (test.frozen == Object.isFrozen(treeResult)));  
    assert(leafResult == expectedLeaf);
    return;
  }

  assert(test.pathNested === test.leafNested);
  var leafResult = treeResult;
  var expectedLeaf = test.returnLeaf ? test.leafValue : test.pathValue;

  if (test.leafNested) {
    leafResult = treeResult[test.name];

    var written = expectedLeaf !== test.leafValue;
    assert(Object.isFrozen(treeResult) == (test.frozen && !written));

    assert(isObject(treeResult));
    assert(treeResult instanceof Array == test.arrayTree);
  }

  assert(leafResult == expectedLeaf);
}, {
  name: '0',
  wildPath: [ false, true ],
  frozen: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  returnLeaf: [ false, true ],
  arrayTree: [ false, true ],
  arrayPath: [ false, true ],
});