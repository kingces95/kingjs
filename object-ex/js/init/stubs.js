'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var errorUndefined = 'Stub/Lazy failed to return a value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var unresolvedTokenError = 'Resolver returned undefined value for token.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';

function initStubs(target, name) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;

  var isReference = this.reference;
  if (isReference) {

    var defaultToken = this.defaultToken;

    this.get = bindPatchReference(
      this.value, defaultToken, name, isConfigurable, isEnumerable, true);

    this.set = bindPatchReference(
      this.value, defaultToken, name, isConfigurable, isEnumerable, false);

    delete this.value;

    return this;
  }

  var isExternal = this.external || false;
  var isLazy = this.lazy || false;
  var isStatic = this.static || false;

  if (isExternal) {

    var ctor = is.function(target) ? target : target.constructor;
    var isLazyStatic = isLazy && isStatic;

    if (this.value) {
      
      this.value = bindPatchExternal(
        this.value, ctor, name, isConfigurable || isLazyStatic, isEnumerable);
    }
    else {

      if (this.get)
        this.get = bindPatchExternal(
          this.get, ctor, name, isConfigurable || isLazyStatic, isEnumerable, true, true);
  
      if (this.set)
        this.set = bindPatchExternal(
          this.set, ctor, name, isConfigurable || isLazyStatic, isEnumerable, true, false);
    }

    this.configurable = true;
  }
    
  if (isLazy) {
    
    if (this.value) {
      this.value = bindPatchLazy(
        this.value, name, isConfigurable, isEnumerable)
    }
    else {
      this.get = bindPatchLazy(
        this.get, name, isConfigurable, isEnumerable, true)
    }

    if (isStatic)
      this.configurable = true;
  }

  return this;
}

function bindPatchExternal(
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

function bindPatchLazy(
  func,
  name,
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

function bindPatchReference(
  resolver, 
  defaultToken, 
  name, 
  isConfigurable, 
  isEnumerable,
  isGet) {

  if (!isGet) {
    return function patchWithToken(token) {
      assert(!is.undefined(token), undefinedTokenError);

      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: isEnumerable,

        get: function patchWithResolvedToken() { 
          var value = resolver.call(this, token);
          trapDebuggerEval(value, unresolvedTokenError);

          Object.defineProperty(this, name, {
            configurable: isConfigurable,
            enumerable: isEnumerable,
            get: () => value
          });

          return value;
        }
        }
      );
    };
  }

  return function patchWithResolvedToken() {
    if (defaultToken === undefined)
      assert(false, derefBeforeAssignmentError);

    this[name] = defaultToken;
    return this[name];
  };
}

// The debugger will prematurely call funcs/stubs. Instead of returning and 
// caching that bad result, the funcs/stubs can return undefined which will
// fire an assert for the debugger to display and not cache the bad result. 
// When the debugger resumes execution the func/stub will be called at the 
// right time and the good result will be cached.
function trapDebuggerEval(value, message) {
  assert(!is.undefined(value), message || errorUndefined)
}

Object.defineProperties(module, {
  exports: { value: initStubs }
});