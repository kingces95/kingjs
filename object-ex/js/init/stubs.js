'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub/Lazy failed to return a value.";

function initStubs(target, name) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isExternal = this.external;
  var isLazy = this.lazy;

  if (isExternal) {

    var ctor = is.function(target) ? target : target.constructor;

    if (this.value) {
      
      this.value = bindPatchWithFunc(
        this.value, ctor, name, isConfigurable || isLazy, isEnumerable);
    }
    else {

      if (this.get)
        this.get = bindPatchWithFunc(
          this.get, ctor, name, isConfigurable || isLazy, isEnumerable, true, true);
  
      if (this.set)
        this.get = bindPatchWithFunc(
          this.set, ctor, name, isConfigurable || isLazy, isEnumerable, true, false);
    }
  }
    
  if (isLazy) {

    if (this.value) {
      this.value = bindPatchWithValue(
        this.value, isConfigurable, isEnumerable)
    }
    else {
      this.get = bindPatchWithValue(
        this.get, isConfigurable, isEnumerable, true)
    }
  }

  return this;
}

function bindPatchWithFunc(
  stub,
  ctor, 
  name, 
  isConfigurable, 
  isEnumerable,
  isAccessor,
  isGet) {

  return function patchWithFunc() {
    assert(this == ctor || this instanceof ctor);
    var funcOrDescriptor = stub.call(ctor, name);
    trapDebuggerEval(funcOrDescriptor);
   
    var descriptor = { 
      configurable: isConfigurable,
      enumerable: isEnumerable 
    };

    if (isAccessor) {
      
      if (is.function(funcOrDescriptor)) {
        descriptor[isGet ? 'get' : 'set'] = funcOrDescriptor;
      } 
      else {
        descriptor.get = funcOrDescriptor.get;
        descriptor.set = funcOrDescriptor.set;
      }
    } 
    else {
      assert(is.function(funcOrDescriptor));
      descriptor.value = funcOrDescriptor;
    }

    var target = ctor == this ? ctor : ctor.prototype;

    Object.defineProperty(
      target, 
      name, 
      descriptor
    );

    if (!isAccessor)
      return descriptor.value.apply(this, arguments);

    if (isGet)
      return descriptor.get.apply(this);
    
    descriptor.set.apply(this, arguments);
  };
}

function bindPatchWithValue(
  func, 
  isConfigurable, 
  isEnumerable, 
  isGet) {

  return function patchWithValue() {
    var value = func.call(this);
    trapDebuggerEval(value);
    
    var descriptor = {
      configurable: isConfigurable,
      enumerable: isEnumerable,
      [isGet ? 'get' : 'value' ]: () => value
    };

    Object.defineProperty(this, name, descriptor);

    return value;
  };  
}

// The debugger will prematurely call funcs/stubs. Instead of returning and 
// caching that bad result, the funcs/stubs can return undefined which will
// fire an assert for the debugger to display and not cache the bad result. 
// When the debugger resumes execution the func/stub will be called at the 
// right time and the good result will be cached.
function trapDebuggerEval(value) {
  assert(!is.undefined(value), errorUndefined)
}

Object.defineProperties(module, {
  exports: { value: initStubs }
});