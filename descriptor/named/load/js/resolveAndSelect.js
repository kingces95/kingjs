'use strict';

var is = require('@kingjs/is');

function resolveAndSelect(name, _, selector) {
  if (!is.string(name))
    return name;

  var result = this[name];

  if (selector)
    result = selector(result);

  return result;
}

Object.defineProperties(module, {
  exports: { value: resolveAndSelect }
});