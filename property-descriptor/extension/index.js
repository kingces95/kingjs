var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { initialize: { name: initializeName } }
  }
} = require('./dependencies');

var failedToResolveExtensionTypeError = 'Failed to resolve extension type.';
var extendsThisError = 'Extension does not extend this object.';

/**
 * @description Lazily declare an accessor or function 
 * but only for specific polymorphic types.
 * 
 * @this any A descriptor describing an accessor or function.
 * 
 * @param name The symbol of the property being described.
 * @param callback Returns a type `this` must be polymorphic
 * with before patching the definition.
 * 
 * @returns A descriptor whose accessors or function has been replaced
 * with a stub which checks that `this` is polymorphic with the extended
 * type before patching and invoking the accessor or function.
 * 
 * @callback
 */
function extension(name, callback) {
  assert(is.symbol(name));

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

    // find target
    var target = Object.getPrototypeOf(this);
    while (target instanceof type)
      target = Object.getPrototypeOf(target);

    // patch
    Object.defineProperty(target, name, descriptor);

    // dispatch
    if (isFunction)
      return this[name].apply(this, arguments);
    if (arguments.length == 0) 
      return this[name];
    this[name] = value;
  }

  // name stub
  initializeName.call(extension, name, 'extension');
  
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

module.exports = extension;