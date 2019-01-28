var assert = require('assert');

/**
 * @description The description.
 * 
 * @this function The callback to invoke for each name or symbol in descriptors.
 * @param closure An object, typically bound, that modifies the arguments passed to `callback`.
 * @param closure.constructor A callback to normalize each value of `descriptors`.
 * @param closure.defaults Default properties to assign to each descriptor.
 * @param target Target on which each descriptor in `descriptors` will be declared.
 * @param descriptors Descriptors to define on `target`.
 * 
 * @returns Returns `target`.
 * 
 * @callback closure.constructor
 * @param target The `target`.
 * @param name The name or symbol of a value of `descriptors`.
 * @param value A value of `descriptors`.
 * @returns Returns `{ target, name, descriptor }`.
 */
function defineMany(constructor, defaults, target, values) {
  for (var key of getOwnPropertyKeys.call(values))
    this(target, key, values[key]);
  return target;
}

module.exports = defineMany;