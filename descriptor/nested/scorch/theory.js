'use strict';

var scorch = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  if (isObject(test.value))
    test.value = { };

  var value = test.value;
  if (test.valueNested) 
    value = { value: value };

  var path = test.path;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : 'value']: path };

  var result = scorch(value, path);

  if (!isObject(result))
    return;

  if (!isObject(result.value))
    return;

    result = result.value;

  expectFrozen = isObject(path);
  assert(Object.isFrozen(result) == expectFrozen);
}, {
  valueNested: [ false, true ],
  value: [ undefined, null, 0, 1, { } ],
  pathNested: [ false, true ],
  path: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})