'use strict';
var assert = require('assert');

var is = require('@kingjs/is');

function initProperty(target, name, descriptor) {
  assert(is.stringOrSymbol(name));
  
  for (var name in descriptor)
    this[name] = descriptor[name];

  return this;
}

Object.defineProperties(module, {
  exports: { value: initProperty }
});