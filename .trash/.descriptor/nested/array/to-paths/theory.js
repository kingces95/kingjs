'use strict';

var toPaths = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var tree = test.value;
  if (test.nested)
    tree = [ tree ]

  var result = toPaths(
    tree, 
    test.leafValue
  );

  if (test.nested) {
    assert(test.length = 1);
    assert(result instanceof Array);
    result = result[0];
  }

  assert(result === test.leafValue);

},{
  leafValue: [ undefined, null, 0, 1 ],
  value: [ undefined, null, 0, 1 ],
  nested: [ false, true ],
})