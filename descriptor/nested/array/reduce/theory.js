'use strict';

var reduce = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = test.leafValue
  if (test.leafNested)
    tree = [ tree ];

  var initialValue = test.hasInitialValue ? [ ] : undefined;

  var result = reduce(tree, (a, o) => {
    if (a instanceof Array == false) {
      assert(!test.hasInitialValue);
      assert(a === undefined);
      a = [];
    }
    a.push(o);
    return a;
  }, initialValue);

  if (result)
    assert(test.hasInitialValue == (result === initialValue));

  assert(result instanceof Array);
  assert(result.length == 1);
  assert(result[0] === test.leafValue);
},{
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
  hasInitialValue: [ false, true ],
})