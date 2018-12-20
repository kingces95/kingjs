//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var initThunk = require('./thunk');

var unresolvedPromiseError = 'Promise returned undefined value.';
var unresolvedStubError = 'Stub returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';
var extendsThisError = 'Extension does not extend this object.';

var defineProperty;

function initStubs(target, name) {
  var isConfigurable = this.configurable || false;

  if (this.thunk)
    return initThunk.call(this, this.thunk);

  if (this.extends)
    initExtension.call(this, name);

  if (this.external)
    initExternal.call(this, name, isConfigurable);
    
  if (this.future)
    initFuture.call(this, name, isConfigurable);

  return this;
}

function initExtension(name) {
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isStatic = this.static || false;
  var isFunction = this.function;
  var getExtendedType = this.extends;

  assert(!isConfigurable);
  assert(!isEnumerable);
  assert(!isStatic);
  assert(!isExternal);

  assert(isExtension);
  assert(is.symbol(name));

  var descriptor = scorchAndFreeze({
    configurable: this.configurable,
    enumerable: this.enumerable,
    value: this.value,
    get: this.get,
    set: this.set,
  });

  var type; 
  var patchAndDispatch = function(value) {

    // cache type
    if (!type)
      type = getExtendedType();
    
    // verify type
    assert(this instanceof type, extendsThisError);

    // find target
    var target = this;
    while (target instanceof type)
      target = Object.getPrototypeOf(target);

    // patch
    Object.defineProperty(target, name, descriptor);

    // dispatch
    if (isFunction)
      return this[name].apply(this, arguments);

    if (arguments.length == 0) 
      return this[name];
    
    this[name] = value;
  }

  return initStub.call(this, patchAndDispatch);
}

function initExternal(name, isConfigurable) {
  var isEnumerable = this.enumerable || false;
  var isWritable = this.writable || false;
  var isExternal = this.external || false;
  var isExtension = this.extends || false;
  var isStatic = this.static || false;
  var isFunction = this.function || false;
  var isGet = 'get' in this;
  var external = this.external;
  var wrap = isFunction ? 'value' : (isGet ? 'get' : 'set');

  assert(!isExtension);
  assert(isExternal);

  var thisCopy = { };
  for (var key in this)
    thisCopy[key] = this[key];

  if (!defineProperty)
    defineProperty = require('../index').defineProperty;

  var rePatchAndDispatch = function() {
    // patch
    var prototype = Object.getPrototypeOf(this);
    defineProperty(prototype, name, thisCopy);

    // dispatch
    if (isFunction)
      return this[name].apply(this, arguments);

    if (arguments.length == 0) 
      return this[name];
    
    this[name] = value;
  }

  var patchAndDispatch = function() {

    // derive descriptor from prototype and name
    var prototype = Object.getPrototypeOf(this);
    var result = external(prototype.constructor, name);
    trapDebuggerEval(result, unresolvedStubError);

    // build descriptor given external result
    var descriptor = {
      configurable: isConfigurable,
      enumerable: isEnumerable
    };

    // wrap result if it's a function
    if (is.function(result)) {
      descriptor[wrap] = result;
      if (isFunction)
        descriptor.writable = isWritable;
    }

    // otherwise simply copy all of results keys
    else {
      for (var key in result)
        descriptor[key] = result[key];
      assert(isFunction == ('value' in descriptor));
    }

    // add thunks to descriptor to re-patch if prototype changes
    if (!isStatic) {

      var func = descriptor.value;
      if (func) {
        descriptor.value = function functionThunk() {
          if (prototype != Object.getPrototypeOf(this))
            return rePatchAndDispatch.apply(this, arguments);
          return func.apply(this, arguments);
        }
      }
    
      var get = descriptor.get;
      if (get) {
        descriptor.get = function getThunk() {
          if (prototype != Object.getPrototypeOf(this))
            return rePatchAndDispatch.apply(this, arguments);
          return get.call(this);
        }
      }
    
      var set = descriptor.set;
      if (set) {
        descriptor.set = function setThunk(value) {
          if (prototype != Object.getPrototypeOf(this))
            return rePatchAndDispatch.apply(this, arguments);
          set.call(this, value);
        }
      }
    }

    // patch
    Object.defineProperty(prototype, name, descriptor);

    // dispatch
    if (isFunction)
      return this[name].apply(this, arguments);

    if (arguments.length == 0) 
      return this[name];
    
    this[name] = value;
  }

  this.configurable = true;

  return initStub.call(this, patchAndDispatch);
}

function initFuture(name, isConfigurable) {
  var isFuture = this.future || false;
  var isStatic = this.static || false;
  var isEnumerable = this.enumerable || false;
  var isFunction = this.function || false;
  var defaultArgument = this.argument;
  var wrap = isFunction ? 'value' : 'get';

  assert(isFuture);
    
  var promise = this.value || this.get;

  var bindPromise = function(argument) {
    return function fulfillPromise() {

      // evaluate
      var value = is.undefined(argument) ? 
        promise.call(this) : promise.call(this, argument);

      trapDebuggerEval(value, unresolvedPromiseError);

      // path
      Object.defineProperty(this, name, {
        configurable: isConfigurable,
        enumerable: isEnumerable,
        value: isFunction ? () => value : value
      });

      return value;
    }
  };

  if (this.set) {
    this.set = function setPromise(value) {

      // bind promise
      assert(!is.undefined(value), undefinedTokenError);
      var boundPromise = bindPromise(value);

      // patch
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: isEnumerable,
        get: boundPromise
      });
    };    

    this.get = function getPromise() {
      trapDebuggerEval(defaultArgument, derefBeforeAssignmentError);
      this[name] = defaultArgument;
      return this[name];
    };
  }
  else {
    this[wrap] = bindPromise(this.argument);
  }

  if (isStatic)
    this.configurable = true;

  return this;
}

function initStub(stub) {
  if ('value' in this)
    this.value = stub;

  if ('get' in this)
    this.get = stub;

  if ('set' in this)
    this.set = stub;

  return this;
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