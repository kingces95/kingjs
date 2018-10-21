'use strict';

var scorch = require('.');
var testRequire = require('..');
var isObject = testRequire('@kingjs/is-object');
var assert = testRequire('@kingjs/assert');
var assertTheory = testRequire('@kingjs/assert-theory');

assertTheory(function(test, id) {

  var value = test.value;
  if (test.valueNested) 
    value = { value: value };

  if (test.freeze && isObject(value))
    Object.freeze(value);

  var path = test.path;
  if (test.pathNested) 
    path = { [test.wildName ? '*' : 'value']: path };

  var result = scorch(value, path);

  if (!isObject(result))
    return;
  
  assert(!Object.isFrozen(result));
  var copied = result != value;

  if (test.valueNested != test.pathNested) {
    assert(!copied);
    return;
  }

  if (!test.valueNested)
    return;

}, {
  freeze: [ false, true ],
  valueNested: [ false, true ],
  value: [ undefined, null, 0, 1 ],
  pathNested: [ false, true ],
  path: [ undefined, null, 0, 1 ],
  wildName: [ false, true ]
})