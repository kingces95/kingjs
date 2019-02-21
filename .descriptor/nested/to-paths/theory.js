'use strict';

var toPaths = require('.');

var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {
  var tree = test.value;
  if (test.nested) {
    tree = { 
      [test.name]: tree,
      take: test.take
    };
  }

  var result = toPaths(
    tree, 
    o => o instanceof Object && o.take, 
    test.leafValue
  );

  if (test.nested && test.take) {
    assert(test.name in result);
    result = result[test.name];
  }

  assert(result === test.leafValue);

},{
  name: 'foo',
  leafValue: [ undefined, null, 0, 1 ],
  value: [ undefined, null, 0, 1 ],
  take: [ true, false ],
  nested: [ false, true ],
})