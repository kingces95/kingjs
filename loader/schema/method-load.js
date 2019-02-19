//'use strict';

var is = require('@kingjs/is');
var assert = require('assert');
var objectEx = require('@kingjs/object-ex');

function load(func) {

  if (is.string(func)) {
    return this.isSetter ? 
      new Function('value', func) :
      new Function(`return ${func};`);
  }

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});