'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var nameNotFoundError = 'Failed to discover descriptor name.'

var namedFunctions = [
  'value',
  'get',
  'set'
]

function getName() {
  var name;

  for (var i = 0; i < namedFunctions.length; i ++) {
    var value = this[namedFunctions[i]];
    if (!is.namedFunction(value))
      continue;

    name = value.name;
    break;
  }

  assert(is.string(name), nameNotFoundError);
  return name;
}

Object.defineProperties(module, {
  exports: { value: getName }
});