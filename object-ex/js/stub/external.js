'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub failed to return a value.";
var errorReplaceSelf = "Stub cannot replace itself.";

function stubExternal(func, name, isStatic, isEnumerable, isAccessor) {
  assert(is.function(func));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  if (isStatic) 
    return bindStatic(func, isAccessor);

  return bind(func, name, isEnumerable, isAccessor);
}

function bindStatic(stub, isAccessor) {
  var value;
  var isGet;

  return function() {
    assert(is.function(this));

    if (is.undefined(value)) {
      value = stub.call(this, name);
      assert(!is.undefined(value), errorUndefined);
        
      if (isAccessor && !is.function(value)) {
        isGet = arguments.length == 0;
        value = value[isGet ? 'get' : 'set'];
      }
    }

    if (!isAccessor)
      return value.apply(this);
      
    assert(isGet == (arguments.length == 0));

    if (isGet)
      return value.apply(this);
    
    value.apply(this, arguments);
  };
}

function bind(stub, name, isEnumerable, isAccessor) {
  return function() {
    assert(!is.function(this));
    assert(!this.hasOwnProperty(name), errorReplaceSelf);

    var value = stub.call(this, name);
    assert(!is.undefined(value), errorUndefined);
   
    var descriptor = {
      configurable: false,
      enumerable: isEnumerable,
    }

    if (isAccessor) {
      if (is.function(value)) {
        var isGet = arguments.length == 0;
        descriptor[isGet ? 'get' : 'set'] = value;
      } 
      else {
        descriptor.get = value.get;
        descriptor.set = value.set;
      }
    } else {
      is.function(value);
      descriptor.value = value;
    }

    Object.defineProperty(
      this.constructor.prototype, 
      name, 
      descriptor
    );

    if (descriptor.value)
      return descriptor.value.apply(this);

    if (descriptor.get)
      return descriptor.get.apply(this);
    
    descriptor.set.apply(this, arguments);
  };
}

Object.defineProperties(module, {
  exports: { value: stubExternal }
});