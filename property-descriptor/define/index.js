var {
  ['@kingjs']: {
    propertyDescriptor: {
      lambdize, 
      makeLazy, 
      targetInstanceOf,
    }
  }
} = dependencies('./dependencies');

/**
 * @description Like `Object.defineProperty` but allows a richer description
 * of properties which include new descriptor properties `callback`, `extends`, and
 * `lazy` which can be modified by `static` and `argument`. 
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param descriptor A descriptor which supports these additional properties:
 * @param descriptor.function Discriminates the descriptor as describing a function
 * as opposed to a field. If set and `value` is a string then it will be "lambdized"
 * -- turned into a function.
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
  var isFuture = descriptor.future;

  var isProcedural = isAccessor || isFunction || isFuture;
  if (isProcedural) {

    lambdize.call(descriptor, name);

    if (descriptor.callback)
      callback(descriptor, name, target);

    if (descriptor.extends) {
      assert(is.symbol(name));
      assert(target == Object.prototype);
      targetInstanceOf.call(descriptor, name);
    }

    if (descriptor.lazy) 
      makeLazy.call(descriptor, name);
  }

  return Object.defineProperty(target, name, descriptor);
}

module.exports = define;
