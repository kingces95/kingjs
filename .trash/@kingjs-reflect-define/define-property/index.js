var { assert,
  '@kingjs': {
    '-reflect': { is },
    '-property-descriptor': {
      lambdize, 
      makeLazy, 
      targetInstanceOf,
    }
  }
} = module[require('@kingjs-module/dependencies')]();

var construct = require('./construct');

/**
 * @description Extends `Object.defineProperty` to allow richer descriptors
 * which can include `callback`, `extends`, and `lazy` properties. And `lazy`
 * can be modified by `seeded`, `seed`, and `static`.
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param descriptor A descriptor which supports these additional properties:
 * @param descriptor.extends A callback that returns a type (function) representing 
 * the type being extended. If runtime `this` is not an `instanceof` the type, 
 * then an exception is thrown. An extension's `name` must be a symbol and its
 * `target` must be `Object.prototype`.
 * @param descriptor.lazy Caches the result of the property on the runtime `this`.
 * @param descriptor.seeded Modifies `lazy`. Allows setting the property with a 
 * value that gets passed to the promise when resolved.
 * @param descriptor.seed Modifies `seeded`. If no value is set, then
 * `seed` is used as a default.
 * @param descriptor.static Modifies `lazy`. Makes the stub configurable
 * so, if runtime `this` and `target` are the same object, the stub can be
 * replaced with the cached value.
 * @param descriptor.callback Called just before calling `Object.defineProperty`
 * to allow the descriptor to configure itself given `name` and `target`. 
 * The resulting descriptor is passed to a recursive call of `defineProperty`.
 * @param descriptor.function Modifies `value`. If set and `value` is a string
 * then the string is wrapped in a function.
 *
 * @returns Returns `target` if the property was successfully created. 
 * Otherwise `undefined` is returned. If `target` is `null` or
 * `undefined` then `{ name, descriptor }` is returned.
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
 * @remarks - Strings that appear where functions are expected will
 * be wrapped into functions; String values for `get` or `set`, 
 * or `value` when `extends` or `lazy` is present are wrapped as functions.
 * 
 * @remarks - Transforms are applied in the order: `lambdize` >
 * `extends` > `lazy` > `callback`.
 * 
 * @remarks - After applying transforms associated with the properties `callback`, `extends`, 
 * and `lazy`, the corresponding property is deleted from the descriptor. This can only be 
 * seen if no `target` is supplied causing the descriptor to be returned.  
 * 
 */ 
function defineProperty() {

  // construct the arguments
  let { target, name, descriptor } = construct(...arguments);

  // value
  var hasValue = 'value' in descriptor;
  var isFunction = descriptor.function;
  assert(!isFunction || hasValue);

  // accessor
  var hasGet = 'get' in descriptor;
  var hasSet = 'set' in descriptor;
  var isAccessor = hasGet || hasSet;

  // extends
  var getType = descriptor.extends;
  var isExtension = descriptor.extends;

  // lazy
  var isLazy = descriptor.lazy;
  var isStatic = descriptor.static;
  var isSeeded = descriptor.seeded;
  var seed = descriptor.seed;

  // callback
  var callback = descriptor.callback;

  // copy and clean
  descriptor = { ...descriptor };
  delete descriptor.extends;
  delete descriptor.lazy;
  delete descriptor.seeded;
  delete descriptor.seed;
  delete descriptor.static;

  var isProcedural = isAccessor || isLazy || isExtension || isFunction;
  if (isProcedural) {

    lambdize.call(descriptor, name);

    if (isExtension) {
      assert(is.symbol(name));
      assert(target == Object.prototype);
      targetInstanceOf.call(descriptor, getType, name);
    }

    if (isLazy)
      makeLazy.call(descriptor, name, isSeeded, seed, isStatic);
  }

  if (target && callback) {
    delete descriptor.callback;
    descriptor = callback(descriptor, name, target);
    return defineProperty(target, name, descriptor);
  }

  if (!target)
    return { name, descriptor };

  assert(isAccessor != hasValue);
  return Object.defineProperty(target, name, descriptor);
}

module.exports = defineProperty;
