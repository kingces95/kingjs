'use strict';

function thunk(target, name) {
  var isFunction = this.function;

  if (isFunction) {

    this.value = function staticThunk() {
      return target[name].apply(target, arguments); 
    }
  }
  else {

    this.get = function staticGetThunk() {
      return target[name]; 
    };

    this.set = function staticSetThunk(value) {
      target[name] = value; 
    }
  }
  
  return this;
}

Object.defineProperties(module, {
  exports: { value: thunk }
});