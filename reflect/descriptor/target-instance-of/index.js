var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    reflect: { descriptor: { rename } }
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
 * @param [name] The name of the property being described. If provided,
 * `this` descriptor will be declared on the deepest prototype of the runtime 
 * `this` for which is `instanceof` returns true.
 * 
 * @returns A descriptor whose accessors or function throws at runtime unless
 * `this` at runtime is an `instanceof` the type return by `callback`.
 * 
 * @callback
 */
function targetInstanceOf(callback, name) {
  var isFunction = 'value' in this;

  var type; 
  var descriptor = { ...this };
  var extension = function(value) {

    // cache type
    if (!type) {
      type = callback();
      assert(!is.undefined(type), failedToResolveExtensionTypeError)
    }

    // `this` could be the prototype of the type (e.g. `this == type.prototype`)
    // which is the target on which we'd like this stub to define the extension.
    // But we cannot use `type.prototype` because `type` could be an "interface" which 
    // has no `prototype` property. See @kingjs/reflect.create-interface. But 
    // interfaces do implement `Symbol.hasInstance`. So we make use of that like this:
    var instance = Object.create(this);
    assert(instance instanceof type, extendsThisError);

    // patch
    if (name) {
      var target = instance;
      do {
        target = Object.getPrototypeOf(target); 
      } while (target instanceof type)
      Object.defineProperty(target, name, descriptor);
    }

    // dispatch
    if (isFunction)
      return this[name].apply(this, arguments);
    if (arguments.length == 0) 
      return this[name];
    this[name] = value;
  }

  // name stub
  rename.call(extension, name, 'extension');
  
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