'use strict';

function bindThunkSetter(target, name) {
  return function() {
    return target[name] = arguments[0]; 
  }
}

Object.defineProperties(module, {
  exports: { value: bindThunkSetter }
});