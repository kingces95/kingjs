'use strict';

var scorch = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isFrozen = testRequire('@kingjs/descriptor.object.is-frozen');

assertTheory(function(test, id) {

  var tree = { };
  if (!isObject(test.leaf))
    tree = test.leaf;
  if (test.nested) {
    tree = [ tree ];
  }

  var result = scorch(tree);

  if (!isObject(result)) {
    assert(test.nested == false);
    return; 
  }
  assert(test.nested);
  assert(result instanceof Array);

  var copied = result != tree;
  var written = test.nested && test.leaf === undefined;
  assert(copied == written);

  assert(isFrozen.call(result));

  if (test.leaf !== undefined) {
    assert(result[0] == test.leaf);
    return;
  }

  assert(result.length == 0);
}, {
  nested: [ false, true ],
  leaf: [ undefined, null, 0, 1 ],
})