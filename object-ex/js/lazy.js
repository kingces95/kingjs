'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub failed to return a value.";
var errorReplaceSelf = "Stub cannot replace itself.";

function lazySetValueOrSlot(funcOrStub, name, isStatic, isStub, isEnumerable, isAccessor, isGet) {
  assert(is.function(funcOrStub));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isStatic) || is.undefined(isStatic));
  assert(is.boolean(isEnumerable) || is.undefined(isEnumerable));
  assert(!is.boolean(isGet) || isAccessor);

  var lazyFunc;

  if (isStatic) {
    if (isStub)
      lazyFunc = lazySetSlotOnType(funcOrStub, name, isAccessor, isGet);
    else
      lazyFunc = lazySetValueOnType(funcOrStub);

    var self;
    return function resolveStaticValueOrSlot() {
      if (is.undefined(self))
        self = this

      // static => 'this' should not change => able to cache on closed variable
      assert(self === this);
    
      return lazyFunc.apply(this, arguments);
    }   
  }

  if (isStub) 
    lazyFunc = lazySetSlotOnInstance(funcOrStub, name, isEnumerable, isAccessor, isGet);
  else
    lazyFunc = lazySetValueOnInstance(funcOrStub, name, isEnumerable, isAccessor);

  return function resolveValueOrSlot() {
    var slots = isStub ? Object.getPrototypeOf(this) : this;

    // instance => the slot is clear before the call and burned after the call
    assert(!Object.getOwnPropertyDescriptor(slots, name), errorReplaceSelf)
    var result = lazyFunc.apply(this, arguments);
    assert(!Object.getOwnPropertyDescriptor(slots, name).configurable);

    return result;
  }
}

// The debugger will prematurely call funcs/stubs. Instead of returning and 
// caching that bad result, the funcs/stubs can return undefined which will
// fire an assert for the debugger to display and not cache the bad result. 
// When the debugger resumes execution the func/stub will be called at the 
// right time and the good result will be cached.
function callAndAssertResult(funcOrStub, name) {
  // name => stub, !name => func
  var result = funcOrStub.call(this, name);
  assert(!is.undefined(result), errorUndefined)
  return result;
}

function lazySetValueOnInstance(func, name, isEnumerable, isAccessor) {
  return function setValueOnInstance() {
    var value = callAndAssertResult.call(this, func, name);
    
    var descriptor = {
      configurable: false,
      enumerable: isEnumerable,
      [isAccessor ? 'get' : 'value' ]: () => value
    };

    Object.defineProperty(this, name, descriptor);

    return value;
  };  
}

function lazySetSlotOnInstance(stub, name, isEnumerable, isAccessor, isGet) {
  return function setSlotOnInstance() {
    var funcOrDescriptor = callAndAssertResult.call(this, stub, name);
   
    var descriptor = { 
      configurable: false,
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
    } else {
      assert(is.function(funcOrDescriptor));
      descriptor.value = funcOrDescriptor;
    }

    Object.defineProperty(
      this.constructor.prototype, 
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

function lazySetValueOnType(func) {
  var cachedValue;

  return function setValueOnType() {
    if (is.undefined(cachedValue))
      cachedValue = callAndAssertResult.call(this, func)
    return cachedValue;
  };
}

function lazySetSlotOnType(stub, name, isAccessor, isGet) {
  var cachedFunc;

  return function setSlotOnType() {
    if (is.undefined(cachedFunc)) {
      cachedFunc = callAndAssertResult.call(this, stub, name);
        
      if (isAccessor && !is.function(cachedFunc))
        cachedFunc = cachedFunc[isGet ? 'get' : 'set'];
    }

    if (!isAccessor)
      return cachedFunc.apply(this, arguments);
      
    if (isGet)
      return cachedFunc.apply(this);
    
    cachedFunc.apply(this, arguments);
  };
}

Object.defineProperties(module, {
  exports: { value: lazySetValueOrSlot }
});