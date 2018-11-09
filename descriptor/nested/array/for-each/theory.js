'use strict';

var forEach = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');
var isObject = testRequire('@kingjs/is-object');

var context = { };

assertTheory(function(test, id) {
  var tree = test.leafValue;
  if (test.leafNested)
    tree = [ tree ];

  function callback(leaf) {
    assert(context === this);

    if (test.leafNested)
      assert(leaf === test.leafValue);
  }

  forEach(tree, callback, context);
}, {
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
});