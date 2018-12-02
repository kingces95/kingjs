'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub failed to return a value.";
var errorReplaceSelf = "Stub cannot replace itself.";

function lazySetValueOrSlot(name, descriptor) {
  if (descriptor.stub) 
    return lazySetSlotOnInstance(name, descriptor);
    
  return lazySetValueOnInstance(name, descriptor);
}

// The debugger will prematurely call funcs/stubs. Instead of returning and 
// caching that bad result, the funcs/stubs can return undefined which will
// fire an assert for the debugger to display and not cache the bad result. 
// When the debugger resumes execution the func/stub will be called at the 
// right time and the good result will be cached.
function trapDebuggerEval(value) {
  assert(!is.undefined(value), errorUndefined)
}

function lazySetValue(func, name, lazyDescriptor) {
  var isConfigurable = lazyDescriptor.configurable || false;
  var isEnumerable = lazyDescriptor.enumerable || false;
  var isGet = lazyDescriptor.get;

  return function setValueOnInstance() {
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

function lazySetSlot(stub, constructor, name, lazyDescriptor) {
  var isConfigurable = lazyDescriptor.configurable || false;
  var isEnumerable = lazyDescriptor.enumerable || false;
  var isAccessor = !lazyDescriptor.value;
  var isGet = lazyDescriptor.get;
  var ctor = lazyDescriptor.constructor;

  return function setSlotOnInstance() {
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

Object.defineProperties(module, {
  exports: { value: lazySetValueOrSlot }
});