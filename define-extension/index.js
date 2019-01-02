'use strict';

function defineExtension(name, descriptor) {

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
}

function initExtensions(x, y) {
  
}

Object.defineProperties(module, {
  exports: { value: copy }
});