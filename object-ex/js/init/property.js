'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  
  for (var name in descriptor)
    this[name] = descriptor[name];

  return this;
}

Object.defineProperties(module, {
  exports: { value: initProperty }
});