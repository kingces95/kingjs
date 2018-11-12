'use strict';

var update = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var is = testRequire('@kingjs/is');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

var context = { };

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested) {
    if (!test.leafDefined)
      tree = test.arrayTree ? [ ] : { };
    else
      tree = test.arrayTree ? [ tree ] : { [test.name]: tree };
  }

  var paths = test.pathValue;
  if (test.pathNested) 
    paths = test.arrayPath ? [ test.pathValue ] :
      { [test.wildPath ? '*' : test.name]: test.pathValue }

  var leafValue = test.leafValue;
  if (test.leafNested && !test.leafDefined)
    leafValue = undefined;

  function callback(leaf, path) {
    assert(context === this);

    assert(path === test.pathValue);

    if (test.pathNested == test.leafNested)
      assert(leaf === test.leafValue);
    else if (test.leafNested)
      assert(leaf === tree);
    else
      assert();

    return test.returnLeaf ? leaf : path;
  }

  var treeResult = update(tree, paths, callback, context);

  if (test.pathNested && !test.leafNested) {
    assert(treeResult === leafValue);
    return;
  }

  if (!test.pathNested && test.leafNested) {
    var leafResult = treeResult;
    var expectedLeaf = test.returnLeaf ? tree : test.pathValue;

    assert(!is.object(treeResult) || isFrozen.call(treeResult));  
    assert(leafResult == expectedLeaf);
    return;
  }

  assert(test.pathNested === test.leafNested);
  var leafResult = treeResult;
  var expectedLeaf = test.returnLeaf ? leafValue : test.pathValue;

  if (test.leafNested) {
    leafResult = treeResult[test.name];
    
    if (!test.leafDefined) {
      expectedLeaf = undefined;
      assert(test.name in treeResult == false);
    }

    assert(isFrozen.call(treeResult));
    assert(is.object(treeResult));
    assert(treeResult instanceof Array == test.arrayTree);
  }

  assert(leafResult == expectedLeaf);
}, {
  name: '0',
  wildPath: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
  leafDefined: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  returnLeaf: [ false, true ],
  arrayTree: [ false, true ],
  arrayPath: [ false, true ],
});