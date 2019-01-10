//'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
  '@kingjs/define.initialize-name': initializeName,
} = require('@kingjs/require-packages').call(module);

var unresolvedPromiseError = 'Promise returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';

function initializeFuture(name, isConfigurable) {
  var hasArgument = 'argument' in this;
  var hasValue = 'value' in this;
  
  var isFunction = hasValue || this.function || false;
  var isConfigurable = this.configurable || false;
  var isEnumerable = this.enumerable || false;
  var isWriteOnce = this.writeOnce || hasArgument || false;
  var isStatic = this.static || false;

  var wrap = isFunction ? 'value' : 'get';
  var promise = this.value || this.get || (o => o);

  this[wrap] = function fulfillPromise(argument) {

    // fulfill
    var value = !isWriteOnce ? promise.call(this) : promise.call(this, argument);
    assert(!is.undefined(value), unresolvedPromiseError);

    var result = value
    if (isFunction) {
      result = () => value;
      initializeName.call(result, name, 'fulfilledPromise')
    }

    // patch
    Object.defineProperty(this, name, {
      configurable: isConfigurable,
      enumerable: isEnumerable,
      value: result
    });

    return value;
  };
  initializeName.call(this[wrap], name);

  if (isWriteOnce) {

    // a writeOnce-future-function is expressed as a get-accessor, not a field
    // this way, we may define a setter which may initialize the future
    delete this.value;
    delete this.writable;

    // deffer bindPromise until initialization
    var defaultArgument = this.argument;
    this.get = function initializeAndFulfillPromise() {

      // initialize with default
      assert(!is.undefined(defaultArgument), derefBeforeAssignmentError);
      this[name] = defaultArgument;

      // fulfill
      return this[name];
    };
    initializeName.call(this.get, name);

    this.set = function initializePromise(value) {
      assert(!is.undefined(value), undefinedTokenError);

      // initialize promise
      var initializedPromise = function() {
        return fulfillPromise.call(this, value);
      }; 
      initializeName.call(initializedPromise, name);

      // patch and await fulfillment
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: isEnumerable,
        [wrap]: initializedPromise
      });
    };   
    this.set = initializeName.call(this.set, name);
  } 

  if (isStatic)
    this.configurable = true;
}

module.exports = initializeFuture;