'use strict';

var forEach = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = test.leafValue;
  if (test.leafNested) 
    tree = { [test.name]: tree };

  var path = test.pathValue;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : test.name]: path };

  var context = { ctx: 0 };

  var result = { };
  forEach(tree, path, function(o, p) {
    assert(this === context);
    result.value = o;
    result.path = p
  }, context);

  if (!test.leafNested && test.pathNested) {
    assert(result.value === undefined);
    return;
  }

  assert(result.path == test.pathValue);

  if (test.leafNested && !test.pathNested) {
    assert(result.value == tree);
    return;
  }

  assert(test.leafNested == test.pathNested);
  assert(result.value === test.leafValue);
}, {
  name: 'foo',
  leafNested: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
});