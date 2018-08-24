'use strict';

var mapNames = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var result = mapNames.call({
    $alpha: 0,
    $bravo: 1,
    $delta: 2,
    value: 3
  }, {
    $alpha: 'alpha',
    $bravo: 'bravo',
    $delta: 'delta'
  });

  assert(Object.keys(result).length == 3);
  assert(result.alpha == 0);
  assert(result.bravo == 1);
  assert(result.delta == 2);
}
readMe();

function readMeProcedural() {
  var result = mapNames.call({
    $alpha: 0,
    $bravo: 1,
    $delta: 2,
    value: 3
  }, function(name) {
    if (name == 'value')
      return undefined;
    
    return name.substr(1);
  });

  assert(Object.keys(result).length == 3);
  assert(result.alpha == 0);
  assert(result.bravo == 1);
  assert(result.delta == 2);
}
readMeProcedural();