'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var unresolvedPromiseError = 'Promise returned undefined value.';
var unresolvedStubError = 'Stub returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';
var extendsThisError = 'Extension does not extend this object.';

var valueTag = Symbol('value');
var getTag = Symbol('get');
var setTag = Symbol('set');

function initStubs(target, name) {
  var isConfigurable = this.configurable || false;
  var isExternal = this.external || false;
  var isFuture = this.future || false;
  var isExtension = this.extends || false;

  if (isExtension)
    return initExtension.call(this, target, name);

  if (isExternal)
    initExternal.call(this, target, name, isConfigurable);
    
  if (isFuture)
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
  assert(!isExternal);
  assert(!isFuture);

  assert(isExtension);
  assert(is.symbol(name));
  assert(!is.function(target));
  assert(is.function(target.constructor));


  var descriptor = { };
  for (var key in this)
    descriptor[key] = this[key];

  var ctor; 
  var lazyCtor = this.extends;

  if (this.value) {
    descriptor.writable = false;
    this.value = function callGetExtensionAndPatch() {
      if (!ctor) ctor = lazyCtor();
      patchExtension.call(this, ctor, name, descriptor);
      return descriptor.value.apply(this, arguments);
    };
  }

  else {
    if (this.get) {
      this.get = function callGetExtensionAndPatch() {
        if (!ctor) ctor = lazyCtor();
        patchExtension.call(this, ctor, name, descriptor);
        return descriptor.get.call(this);
      };
    }

    if (this.set) {
      this.set = function callSetExtensionAndPatch() {
        if (!ctor) ctor = lazyCtor();
        patchExtension.call(this, ctor, name, descriptor);
        descriptor.set.call(this, arguments[0]);
      };
    }
  }

  return this;
}

function initExternal(target, name, isConfigurable) {
  var isExternal = this.external || false;
  var isFuture = this.future || false;
  var isStatic = this.static || false;

  assert(isExternal);

  var stub = this.value || this.get || this.set;
  assert(is.function(stub));

  var descriptor = { 
    configurable: isConfigurable,
    enumerable: this.enumerable,
    [valueTag]: this.value, // => stub(ctor)
    [getTag]: this.get, // => stub(ctor)
    [setTag]: this.set, // => stub(ctor)

    // no need to patch the stub if it'll be immediately set with the promise
    backPatch: (isFuture && isStatic) == false,
  };

  if (this.value) {
    descriptor.writable = this.writable;
    this.value = function callFuncStubAndPatch() {
      descriptor = callStubAndPatch.call(this, stub, target, name, descriptor);
      return descriptor.value.apply(this, arguments);
    };
  }
  else {
    if (this.get) {
      this.get = function callGetStubAndPatch() {
        descriptor = callStubAndPatch.call(this, stub, target, name, descriptor);
        return descriptor.get.call(this);
      };
    }

    if (this.set && !isFuture) {
      this.set = function callSetStubAndPatch() {
        descriptor = callStubAndPatch.call(this, stub, target, name, descriptor);
        descriptor.set.apply(this, arguments);
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

function patchExtension(ctor, name, descriptor) {
  assert(this instanceof ctor, extendsThisError);

  assert(is.symbol(name));
  assert(!descriptor.configurable);
  assert(!descriptor.enumerable);
  assert(!descriptor.writable);

  var prototype = Object.getPrototypeOf(this);
  Object.defineProperty(prototype, name, descriptor);
}

function callStubAndPatch(stub, target, name, descriptor) {
  var ctor = is.function(target) ? 
    target : Object.getPrototypeOf(this).constructor;

  assert(this == ctor || this instanceof ctor);

  descriptor = callStub(stub, ctor, name, descriptor);
  
  if (descriptor.backPatch)
    Object.defineProperty(target, name, descriptor) 

  return descriptor;
}

function callStub(stub, ctor, name, descriptor) {

  var value = stub(ctor, name);
  trapDebuggerEval(value, unresolvedStubError);

  if (descriptor[valueTag]) {
    assert(is.function(value));
    descriptor.value = value;
  } 
  else if (is.function(value)) {
    if (descriptor[getTag])
      descriptor.get = value;
    else 
      descriptor.set = value;
  } 
  else {
    descriptor.get = value.get;
    descriptor.set = value.set;
  }

  return descriptor;
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