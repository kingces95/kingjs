'use strict';

var freeze = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = { };
  if (!isObject(test.leafValue))
    tree = test.leafValue;
  if (test.valueNested) 
    tree = [ tree ];

  var result = freeze(tree);

  assert(result === tree);
  if (!isObject(result))
    return; 

  assert(Object.isFrozen(result) == true);

  var value = tree;
  if (test.leafNested)
    value = value[0];
  
  if (!isObject(value))
    return;

  assert(Object.isFrozen(value));
}, {
  leafNested: [ false, true ],
  leafValue: [ undefined, null, 0, 1, { } ],
})