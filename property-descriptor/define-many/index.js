var assert = require('assert');

var {
  ['@kingjs']: {
    is,
    propertyDescriptor: { define }
  }
} = require('./dependencies');

/**
 * @description The description.
 * 
 * @param target `target` comment.
 * @param values `values` comment.
 * @param [wrap] `wrap` comment.
 * @param [map] `map` comment.
 * 
 * @returns Returns comment.
 * 
 * @callback wrap
 * @param descriptor The value to wrap into a descriptor.
 */
function defineMany(target, values, wrap, map) {

  for (var key in getOwnPropertyKeys.call(values)) {
    if (map) 
      key = map(key);

    var descriptor = values[key];
    if (!is.object(descriptor))
      descriptor = wrap(descriptor);

    define(target, name, descriptor);
  }

  return target;
}

module.exports = defineMany;