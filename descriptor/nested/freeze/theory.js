'use strict';

var freeze = require('.');
var testRequire = require('..');
var is = testRequire('@kingjs/is');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = { };
  if (!is.object(test.leafValue))
    tree = test.leafValue;
  if (test.leafNested) 
    tree = { [test.name]: tree };

  var path = test.pathValue;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : test.name]: path };

  var result = freeze(tree, path);

  assert(result === tree);
  if (!is.object(result))
    return; 

  assert(Object.isFrozen(result) == true);

  if (test.leafNested && !test.pathNested) {
    var value = result[test.name];
    if (!is.object(value))
      return;

    assert(Object.isFrozen(value) == false);
    return;
  }

  if (!test.leafNested && test.pathNested)
    return;

  assert(test.leafNested == test.pathNested);
  var value = tree;
  if (test.leafNested)
    value = value[test.name];
  
  if (!is.object(value))
    return;

  assert(Object.isFrozen(value));
}, {
  name: '0',
  leafNested: [ false, true ],
  leafValue: [ undefined, null, 0, 1, { } ],
  pathNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})