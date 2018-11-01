'use strict';

var toArray = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested)
    tree = [ tree ];

  var result = toArray(tree);

  if (test.leafValue === undefined) {
    assert(result === null);
    return;
  }

  assert(result.length == 1);
  assert(result[0] === test.leafValue);
},{
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
})