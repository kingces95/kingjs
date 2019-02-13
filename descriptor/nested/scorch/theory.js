'use strict';

var scorch = require('.');

var is = require('@kingjs/is');
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var tree = test.leafValue;
  if (test.valueNested)
    tree = test.array ? [ tree ] : { [test.name]: tree };

  var path = test.pathValue;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : test.name]: path };

  var result = scorch(tree, path);

  var copied = result !== tree;
  var written = test.valueNested && test.leafValue === undefined;

  assert(copied == written);

  if (!is.object(result)) {
    assert(test.valueNested == false);
    return;
  }

  assert(tree instanceof Array == result instanceof Array);

  if (test.leafValue !== undefined) {
    assert(result[test.name] === test.leafValue);
    return;
  }

  assert(test.name in result == false);

}, {
  name: '0',
  array: [ false, true ],
  valueNested: [ false, true ],
  leafValue: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  pathValue: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})