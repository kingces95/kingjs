'use strict';

var update = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

var context = { };

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested)
    tree = [ tree ];

  var expected = test.leafValue;

  function callback(leaf) {
    assert(context === this);

    if (test.leafNested)
      assert(leaf === test.leafValue);

    return expected = test.returnLeaf ? leaf : null;
  }

  var treeResult = update(tree, callback, context);

  var leafResult = treeResult;
  var expectedLeaf = test.returnLeaf ? test.leafValue : null;

  if (test.leafNested) {
    assert(treeResult instanceof Array);
    leafResult = treeResult[0];

    assert(isFrozen.call(treeResult));
  }

  assert(leafResult == expectedLeaf);
}, {
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
  returnLeaf: [ false, true ]
});