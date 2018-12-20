//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var initStubs = require('./stubs');

var unresolvedStubError = 'Stub returned undefined value.';

var defineProperty;

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
    assert(!is.undefined(result), unresolvedStubError)

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

  return initStubs.call(this, patchAndDispatch);
}

Object.defineProperties(module, {
  exports: { value: initExternal }
});