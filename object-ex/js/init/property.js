'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initProperty(x, y) {
  assert('configurable' in this);
  assert('enumerable' in this);
  assert(is.stringOrSymbol(x));
  
  for (var name in y)
    this[name] = y[name];

  return this;
}

Object.defineProperties(module, {
  exports: { value: initProperty }
});