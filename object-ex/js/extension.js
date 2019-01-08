//'use strict';
var assert = require('assert');

var is = require('@kingjs/is');
var initStub = require('./stub');

var failedToResolveExtensionTypeError = 'Failed to resolve extension type.';
var extendsThisError = 'Extension does not extend this object.';

function initExtension(name) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isFunction = this.function;
  var getExtendedType = this.extends;

  assert(!isConfigurable);
  assert(!isEnumerable);
  assert(!isExternal);

  assert(isExtension);
  assert(is.symbol(name));

  var descriptor = { };
  for (var key in this)
    descriptor[key] = this[key];

  var type; 
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

  initStub.call(extension, name);
  
  if ('value' in this)
    this.value = extension;

  if ('get' in this)
    this.get = extension;

  if ('set' in this)
    this.set = extension;

  return this;
}

Object.defineProperties(module, {
  exports: { value: initExtension }
});