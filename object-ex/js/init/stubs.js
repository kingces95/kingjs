'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var initThunk = require('./thunk');

var unresolvedPromiseError = 'Promise returned undefined value.';
var unresolvedStubError = 'Stub returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';
var extendsThisError = 'Extension does not extend this object.';

var valueTag = Symbol('value');
var getTag = Symbol('get');
var setTag = Symbol('set');
var Name = 'name';

function initStubs(target, name) {
  var isConfigurable = this.configurable || false;

  if (this.thunk)
    return initThunk.call(this, this.thunk);

  if (this.extends)
    initExtension.call(this, target, name);

  if (this.external)
    initExternal.call(this, target, name, isConfigurable);
    
  if (this.future)
    initFuture.call(this, name, isConfigurable);

  return this;
}

function initExtension(target, name) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isStatic = this.static || false;
  var isFuture = this.future || false;

  assert(!isConfigurable);
  assert(!isEnumerable);
  assert(!isStatic);
  assert(!isFuture);

  assert(isExtension);
  assert(is.symbol(name));
  assert(!is.function(target));
  assert(is.function(target.constructor));

  var descriptor = scorchAndFreeze({ 
    configurable: isConfigurable,
    enumerable: this.enumerable,
    value: this.value,
    get: this.get,
    set: this.set,
  });

  var extendedType; 
  var getExtendedType = this.extends;
  var stub = function(ctor, name) {
    if (!extendedType)
      extendedType = getExtendedType();
    
    var protoInstance = Object.create(ctor.prototype);
    assert(protoInstance instanceof extendedType, extendsThisError);

    if (isExternal)
      return callStub(ctor, name, descriptor);

    return descriptor;
  }

  this.external = true;
  this.value = stub;
  this.get = stub;
  this.set = stub;
  scorch(this);

  return this;
}

function initExternal(target, name, isConfigurable) {
  var isExternal = this.external || false;
  var isFuture = this.future || false;
  var isStatic = this.static || false;

  assert(isExternal);

  var descriptor = scorchAndFreeze({ 
    configurable: isConfigurable,
    enumerable: this.enumerable,
    writable: this.writable,
    value: this.value,
    get: this.get,
    set: this.set,

    // no need to patch the stub if it'll be immediately set with the promise
    backPatch: (isFuture && isStatic) == false,
  });

  if (this.value) {
    this.value = function callFuncStubAndPatch() {
      var result = callStubAndPatch.call(this, target, name, descriptor);
      return result.value.apply(this, arguments);
    };
  }
  else {
    if (this.get) {
      this.get = function callGetStubAndPatch() {
        var result = callStubAndPatch.call(this, target, name, descriptor);
        return result.get.call(this);
      };
    }

    if (this.set && !isFuture) {
      this.set = function callSetStubAndPatch() {
        var result = callStubAndPatch.call(this, target, name, descriptor);
        result.set.apply(this, arguments);
      };
    }
  }

  this.configurable = true;

  return this;
}

function initFuture(name, isConfigurable) {
  var isFuture = this.future || false;
  var isStatic = this.static || false;

  assert(isFuture);
    
  var promise = this.value || this.get;

  var descriptor = { 
    configurable: isConfigurable,
    enumerable: this.enumerable,
    [valueTag]: this.value, // => promise(this[, argument])
    [getTag]: this.get, // => promise(this[, argument])
    [setTag]: this.set, // => argument = value, then fulfill

    argument: this.argument,
  };

  if (this.get)
    descriptor.writable = this.writable;

  if (!this.set) {
    this[this.get ? 'get' : 'value'] = createPromise(promise, name, descriptor);
  }
  else {
    assert(!this.value);
    this.set = createSetPromiseArgument(promise, name, descriptor);    
    this.get = function fulfillPromise() {
      trapDebuggerEval(descriptor.argument, derefBeforeAssignmentError);
      this[name] = descriptor.argument;
      return this[name];
    };
  }

  if (isStatic)
    this.configurable = true;

  return this;
}

function callStubAndPatch(target, name, descriptor) {
  var ctor = is.function(target) ? 
    target : Object.getPrototypeOf(this).constructor;

  assert(this == ctor || this instanceof ctor);

  var result = callStub(ctor, name, descriptor);
  
  if (descriptor.backPatch)
    Object.defineProperty(target, name, result) 

  return result;
}

function callStub(ctor, name, descriptor) {

  var stub = descriptor.value || descriptor.get || descriptor.set;
  assert(is.function(stub));

  var value = stub(ctor, name);
  trapDebuggerEval(value, unresolvedStubError);

  var result = {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable
  };

  if (descriptor.value) {
    assert(is.function(value));
    result.writable = descriptor.writable;
    result.value = value;
  } 
  else if (is.function(value)) {
    if (descriptor.get)
      result.get = value;
    else 
      result.set = value;
  } 
  else {
    result.get = value.get;
    result.set = value.set;
  }

  return result;
}

function createPromise(promise, name, descriptor) {
  return function fulfillPromiseAndBindFuture() {
    var value = promise.call(this, descriptor.argument);
    trapDebuggerEval(value, unresolvedPromiseError);

    descriptor = Object.create(descriptor);
    descriptor.value = descriptor[getTag] ? value : () => value;

    Object.defineProperty(this, name, descriptor);

    return value;
  };  
}

function createSetPromiseArgument(promise, name, descriptor) {
  return function setPromiseArgument(value) {
    assert(!is.undefined(value), undefinedTokenError);

    descriptor = Object.create(descriptor);
    descriptor.argument = value;

    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: createPromise(promise, name, descriptor)
    });
  }
}

function scorch(target) {
  for (var name in target) {
    if (is.undefined(target[name]))
      delete target[name];
  }

  return target;
}

function scorchAndFreeze(target) {
  return Object.freeze(scorch(target));
}

// The debugger will prematurely call funcs/stubs. Instead of returning and 
// caching that bad result, the funcs/stubs can return undefined which will
// fire an assert for the debugger to display and not cache the bad result. 
// When the debugger resumes execution the func/stub will be called at the 
// right time and the good result will be cached.
function trapDebuggerEval(value, message) {
  assert(!is.undefined(value), message)
}

Object.defineProperties(module, {
  exports: { value: initStubs }
});