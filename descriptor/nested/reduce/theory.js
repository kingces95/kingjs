'use strict';

var reduce = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = test.leafValue
  if (test.leafNested)
    tree = { [test.name]: tree };

  var path = test.pathValue;
  if (test.pathNested)
    path = { [test.wildPath ? '*' : test.name]: path };

  var initialValue = test.hasInitialValue ? [ ] : undefined;

  var result = reduce(tree, path, (a, o) => {
    if (a instanceof Array == false) {
      assert(a === o);
      a = [];
    }
    a.push(o);
    return a;
  }, initialValue);

  if (result)
    assert(test.hasInitialValue == (result === initialValue));

  if (test.leafNested && !test.pathNested) {
    assert(result.length == 1);
    assert(result[0] == tree);
    return;
  }

  if (!test.leafNested && test.pathNested) {
    if (test.hasInitialValue)
      assert(result.length == 0);
    else
      assert(result === undefined);
    return;
  }

  assert(test.leafNested == test.pathNested);
  assert(result.length == 1);
  assert(result[0] === test.leafValue);
},{
  name: 'foo',
  wildPath: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  leafNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  hasInitialValue: [ false, true ],
})