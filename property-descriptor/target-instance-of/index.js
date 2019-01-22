var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { rename }
  }
} = require('./dependencies');

var failedToResolveExtensionTypeError = 'Failed to resolve extension type.';
var extendsThisError = 'Extension does not extend this object.';

/**
 * @description Add a precondition to an accessor or function descriptor 
 * which throws unless `this` at runtime is an `instanceof` a specific type.
 * 
 * @this any A descriptor describing an accessor or function.
 * 
 * @param callback Returns the type `this` must be an `instanceof` at runtime
 * in order to access the property. 
 * @param [symbol] The symbol of the property being described. If provided,
 * `this` descriptor will be declared on the deepest prototype of the runtime 
 * `this` for which is `instanceof` returns true.
 * 
 * @returns A descriptor whose accessors or function throws at runtime unless
 * `this` at runtime is an `instanceof` the type return by `callback`.
 * 
 * @callback
 */
function targetInstanceOf(callback, symbol) {
  assert(!symbol || is.symbol(symbol));

  var isFunction = 'value' in this;

  var type; 
  var descriptor = { ...this };
  var extension = function(value) {

    // cache type
    if (!type) {
      type = callback();
      assert(!is.undefined(type), failedToResolveExtensionTypeError)
    }

    // verify type
    assert(this instanceof type, extendsThisError);

    if (symbol) {

      // find target
      var target = Object.getPrototypeOf(this);
      while (target instanceof type)
        target = Object.getPrototypeOf(target);

      // patch
      Object.defineProperty(target, symbol, descriptor);
    }

    // dispatch
    if (isFunction)
      return this[symbol].apply(this, arguments);
    if (arguments.length == 0) 
      return this[symbol];
    this[symbol] = value;
  }

  // name stub
  rename.call(extension, symbol, 'extension');
  
  // initialize stub on descriptor
  if ('value' in this)
    this.value = extension;
  if ('get' in this)
    this.get = extension;
  if ('set' in this)
    this.set = extension;

  // the stub itself is invariant
  this.configurable = false;
  this.enumerable = false;
  if (isFunction)
    this.writable = false;

  return this;
}

module.exports = targetInstanceOf;