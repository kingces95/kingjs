//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex');

function load(func) {

  if (is.string(func))
    return new Function('return ' + func);

  return func;
}

Object.defineProperties(module, {
  exports: { value: load }
});