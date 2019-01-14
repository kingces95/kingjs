//'use strict';
var assert = require('assert');
var {
  '@kingjs/is': is,
  '@kingjs/define-property.initialize-name': initializeName,
} = require('@kingjs/require-packages').call(module);


var failedToResolveExtensionTypeError = 'Failed to resolve extension type.';
var extendsThisError = 'Extension does not extend this object.';

function initializeExtension(name) {
  assert(is.symbol(name));

  var isFunction = this.function;

  var type; 
  var descriptor = { ...this };
  var getExtendedType = this.extends;
  var extension = function(value) {

    // cache type
    if (!type) {
      type = getExtendedType();
      assert(!is.undefined(type), failedToResolveExtensionTypeError)
    }
    
    // verify type
    assert(this instanceof type, extendsThisError);

    // find target
    var target = this;
    while (Object.getPrototypeOf(target) instanceof type)
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

module.exports = initializeExtension;