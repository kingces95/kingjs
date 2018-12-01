'use strict';

function bindThunk(target, name) {
  return function() {
    return target[name].apply(target, arguments); 
  }
}

Object.defineProperties(module, {
  exports: { value: bindThunk }
});