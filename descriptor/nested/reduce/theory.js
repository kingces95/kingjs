'use strict';

var reduce = require('.');
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

  var initialValue = test.hasInitialValue ? [ ] : undefined;

  var result = reduce(value, tree, (a, o) => {
    if (a instanceof Array == false) {
      assert(a === o);
      a = [];
    }
    a.push(o);
    return a;
  }, initialValue);

  if (!test.hasPaths || !test.hasTree) {
    assert(result === initialValue);
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
  hasInitialValue: [ false, true ],
})