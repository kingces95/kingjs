'use strict';

var scorch = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var value = isObject(test.value) ? { } : test.value;
  if (test.valueNested) 
    value = { value: value };

  var path = test.path;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : 'value']: path };

  scorch(value, path);

  if (!isObject(value))
    return;

  var expectFrozen = path !== undefined;
  assert(Object.isFrozen(value) == expectFrozen);

  if (!isObject(value.value))
    return;
  value = value.value;

  expectFrozen = isObject(path);
  assert(Object.isFrozen(value) == expectFrozen);
}, {
  valueNested: [ false, true ],
  value: [ undefined, null, 0, 1, { } ],
  pathNested: [ false, true ],
  path: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})