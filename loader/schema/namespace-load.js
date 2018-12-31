'use strict';

var assert = require('@kingjs/assert');
var is = require('@kingjs/is');

function load(name) {
  assert(is.string(name));
  
  var loadable = this.resolve(name);
  if (!loadable)
    return null;

  assert('load' in loadable);
  return loadable.load();
}

Object.defineProperties(module, {
  exports: { value: load }
});