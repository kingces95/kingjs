'use strict';

var isOwnPropertyEnumerable = Object.prototype.propertyIsEnumerable;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEnumerable(name) {
  var object = this;

  while (object) {
    
    if (hasOwnProperty.call(object, name)) {
      if (isOwnPropertyEnumerable.call(object, name))
        return true;
    }
 
    object = Object.getPrototypeOf(object);
  }
  return false;
}

Object.defineProperties(module, {
  exports: { value: isEnumerable }
});