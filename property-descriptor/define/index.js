var assert = require('assert');

var {
  ['@kingjs']: {
    is,
    propertyDescriptor: {
      lambdize, 
      makeLazy, 
      targetInstanceOf,
    }
  }
} = require('./dependencies');

/**
 * @description Like `Object.defineProperty` but allows a richer description
 * of properties which include new descriptor properties `callback`, `extends`, and
 * `lazy` which can be modified by `static` and `argument`. 
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param descriptor A descriptor which supports these additional properties:
 * @param descriptor.function Modifies `value`. Indicates `value`, if present, describes 
 * a function as opposed to a "field". If `value` is a string then it will be "lambdized".
 * @param descriptor.callback Allows configuring the descriptor given `name` and `target`.
 * @param descriptor.extends A callback that returns a function representing 
 * the type being extended. If runtime `this` is not an `instanceof` the returned
 * function, then the property will throw an exception. If present, then `name` must be 
 * a symbol and `target` must be `Object.prototype`. 
 * @param descriptor.lazy Caches the result of the property on the runtime `this`.
 * @param descriptor.static Modifies `lazy`. Set when runtime `this` and `target`
 * are the same object.
 * @param descriptor.argument Modifies `lazy`. Allows setting the property with a 
 * value that gets passed to the promise when resolved. If no value is set, then
 * `argument` is used as a default.
 * 
 * @returns Return the target with a newly defined property.
 * 
 * @callback descriptor.callback 
 * @param descriptor A copy of the descriptor.
 * @param name The name of the property.
 * @param target The target on which the property will be defined.
 * @returns Returns an updated descriptor.
 * 
 * @callback descriptor.extends
 * @returns Returns a function representing the type being extended. 
 * 
 * @remarks - Strings that appear where functions are expected, namely 
 * the properties `get` or `set`, or `value` when `function` is present,
 * will be turned into functions.
 * @remarks - Transforms are applied in the order:
 * "lambdize" as described above, then `callback`, then `extends`, then `lazy`.
 * Transforms are only applied for descriptors describing functions or accessors. 
 * Field descriptors undergo no transforms and the additional descriptor 
 * properties are ignored. 
 * 
 */
function define(target, name, descriptor) {
  descriptor = { ...descriptor };

  var hasGet = 'get' in descriptor;
  var hasSet = 'set' in descriptor;

  var isAccessor = hasGet || hasSet;
  var isFunction = descriptor.function;
  var isLazy = descriptor.lazy;
  var isExtension = descriptor.extends;

  if (descriptor.callback)
    descriptor.callback(descriptor, name, target);

  var isProcedural = isAccessor || isFunction || isLazy || isExtension;
  if (isProcedural) {

    lambdize.call(descriptor, name);

    if (isExtension) {
      assert(is.symbol(name));
      assert(target == Object.prototype);
      targetInstanceOf.call(descriptor, descriptor.extends, name);
    }

    if (isLazy) 
      makeLazy.call(descriptor, name, descriptor.argument, descriptor.static);
  }

  return Object.defineProperty(target, name, descriptor);
}

module.exports = define;
