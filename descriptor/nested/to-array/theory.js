'use strict';

var toArray = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var value;
  if (test.hasTree) {
    value = { };
    Object.defineProperty(value, test.name, {
      enumerable: test.enumerable,
      value: test.treeValue
    })

    if (test.inherited)
      value = Object.create(value);

    if (test.nested)
      value = { [test.nestedName]: value };
  }

  var tree;
  if (test.hasPaths) {
    tree = { [test.name]: test.pathValue };
    if (test.nested)
      tree = { [test.nestedName]: tree };
  }

  var result = toArray(value, tree);

  if (!test.hasPaths || !test.hasTree) {
    assert(result === null);
    return;
  }

  assert(result.length == 1);
  assert(result[0] === test.treeValue);
},{
  name: 'foo',
  nestedName: 'bar',
  hasTree: [ false, true ],
  hasPaths: [ false, true ],
  treeValue: [ undefined, null, 0, 1 ],
  pathValue: [ undefined, null, 0, 1, function() { } ],
  enumerable: [ false, true ],
  inherited: [ false, true ],
  nested: [ false, true ],
})