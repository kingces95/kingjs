'use strict';

var toArray = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested)
    tree = { [test.name]: tree };

  var path = test.pathValue;
  if (test.pathNested)
    path = { [test.wildName ? '*' : test.name]: path };

  var result = toArray(tree, path);

  if (test.leafNested && !test.pathNested) {
    assert(result.length == 1);
    assert(result[0] === tree);
    return;
  }

  if (!test.leafNested && test.pathNested) {
    assert(result === null);
    return;
  }

  assert(test.leafNested == test.pathNested);
  if (test.leafValue === undefined) {
    assert(result === null);
    return;
  }

  assert(result.length == 1);
  assert(result[0] === test.leafValue);
},{
  name: 'foo',
  leafValue: [ undefined, null, 0, 1 ],
  pathValue: [ null, 0, 1 ],
  leafNested: [ false, true ],
  pathNested: [ false, true ],
  wildName: [ false, true ]
})