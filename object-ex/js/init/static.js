'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function initStatic(target, name) {
  if (!isStatic)
    return this;

  assert(is.function(target));

  var isConfigurable = this.isConfigurable || false;
  var isEnumerable = this.isEnumerable || false;
  var isStatic = this.static;
  var isAccessor = !this.value;
  
  var descriptor = {
    isConfigurable: isConfigurable,
    enumerable: isEnumerable,
  }

  if (isAccessor) {
    descriptor.get = function() {
      return target[name]; 
    };

    descriptor.set = function() {
      return target[name] = arguments[0]; 
    }
  } 
  else {
    descriptor.value = function() {
      return target[name].apply(target, arguments); 
    }
  }
  
  Object.defineProperty(
    target.prototype,
    name, 
    descriptor
  );

  return this;
}

Object.defineProperties(module, {
  exports: { value: initStatic }
});