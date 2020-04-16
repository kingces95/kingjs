'use strict';

var scorch = require('.');

var isObject = require('@kingjs/is-object');
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');
var isFrozen = require('@kingjs/descriptor.object.is-frozen');

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