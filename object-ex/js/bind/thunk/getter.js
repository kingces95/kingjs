'use strict';

function bindThunkGetter(target, name) {
  return function() {
    return target[name]; 
  }
}

Object.defineProperties(module, {
  exports: { value: bindThunkGetter }
});