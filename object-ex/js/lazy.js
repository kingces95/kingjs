'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = "Stub failed to return a value.";
var errorReplaceSelf = "Stub cannot replace itself.";

function lazy(funcOrStub, name, isStatic, isEnumerable, isAccessor, isStub) {
  assert(is.function(funcOrStub));
  assert(is.stringOrSymbol(name));
  assert(is.boolean(isEnumerable));

  if (isStub) {

    if (isStatic) 
      return bindStubStatic(funcOrStub, name, isAccessor);

    return bindStubInstance(funcOrStub, name, isEnumerable, isAccessor);
  }

  if (isStatic) 
    return bindFuncStatic(funcOrStub);

  return bindFuncInstance(funcOrStub, name, isEnumerable, isAccessor);
}

function bindStubStatic(stub, name, isAccessor) {
  var func;

  return function() {
    assert(is.function(this));

    if (is.undefined(func)) {
      func = stub.call(this, name);
      assert(!is.undefined(func), errorUndefined);
        
      if (isAccessor && !is.function(func)) {
        var isGet = arguments.length == 0;
        func = func[isGet ? 'get' : 'set'];
      }
    }

    if (!isAccessor)
      return func.apply(this, arguments);
      
    var isGet = arguments.length == 0;
    if (isGet)
      return func.apply(this);
    
    func.apply(this, arguments);
  };
}

function bindFuncStatic(func) {
  var value;

  return function() {
    assert(is.function(this));

    if (is.undefined(value)) {
      value = func.call(this);
      assert(value, errorUndefined);
    }

    return value;
  };
}

function bindStubInstance(stub, name, isEnumerable, isAccessor) {
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
      assert(is.function(value));
      descriptor.value = value;
    }

    Object.defineProperty(
      this.constructor.prototype, 
      name, 
      descriptor
    );

    if (descriptor.value)
      return descriptor.value.apply(this, arguments);

    var isGet = arguments.length == 0;
    if (isGet)
      return descriptor.get.apply(this);
    
    descriptor.set.apply(this, arguments);
  };
}

function bindFuncInstance(func, name, isEnumerable, isAccessor) {
  return function() {
    assert(!is.function(this));
    assert(!this.hasOwnProperty(name), errorReplaceSelf);

    var value = func.call(this);
    assert(!is.undefined(value), errorUndefined)
    
    Object.defineProperty(this, name, {
      configurable: false,
      enumerable: isEnumerable,
      [ isAccessor ? 'get' : 'value' ]: () => value
    })

    return value;
  };  
}

Object.defineProperties(module, {
  exports: { value: lazy }
});