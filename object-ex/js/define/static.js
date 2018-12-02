'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

function defineThunkToStatic(target, name, isEnumerable, isAccessor) {
  assert(is.function(target));

  var descriptor = {
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
  
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineThunkToStatic }
});