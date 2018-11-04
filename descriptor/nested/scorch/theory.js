'use strict';

var scorch = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = test.leafValue;
  if (test.valueNested) {
    tree = { [test.name]: tree };

    if (test.freeze)
      Object.freeze(tree);
  }

  var path = test.pathValue;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : test.name]: path };

  var result = scorch(tree, path);

  var copied = result !== tree;
  var written = test.valueNested && test.leafValue === undefined;
  var copyOnWrite = test.freeze;
  
  assert(copied == (copyOnWrite && written));

  if (!isObject(result))
    return;

  if (test.leafValue !== undefined) {
    assert(result[test.name] === test.leafValue);
    return;
  }

  assert(test.name in result == false);

}, {
  name: 'name',
  freeze: [ false, true ],
  valueNested: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})