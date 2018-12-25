//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var initStub = require('./stub');

var unresolvedPromiseError = 'Promise returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';

function initFuture(name, isConfigurable) {
  var isFuture = this.future || false;
  assert(isFuture);

  var hasArgument = 'argument' in this;
  var hasValue = 'value' in this;
  
  var isFunction = hasValue || this.function || false;
  var isStatic = this.static || false;
  var isEnumerable = this.enumerable || false;
  var isWriteOnce = this.writeOnce || hasArgument || false;

  var wrap = isFunction ? 'value' : 'get';
  var promise = this.value || this.get || (o => o);

  var fulfillPromise = function(argument) {

    // fulfill
    var value = !isWriteOnce ? promise.call(this) : promise.call(this, argument);
    assert(!is.undefined(value), unresolvedPromiseError);

    var result = value
    if (isFunction) {
      var fulfilledPromise = () => value;
      result = initStub.call(fulfilledPromise, name);
    }

    // patch
    Object.defineProperty(this, name, {
      configurable: isConfigurable,
      enumerable: isEnumerable,
      value: result
    });

    return value;
  };
  this[wrap] = initStub.call(fulfillPromise, name);

  if (isWriteOnce) {

    // a writeOnce-future-function is expressed as a get-accessor, not a field
    // this way, we may define a setter which may initialize the future
    delete this.value;
    delete this.writable;

    // deffer bindPromise until initialization
    var defaultArgument = this.argument;
    var initializeAndFulfillPromise = function() {

      // initialize with default
      assert(!is.undefined(defaultArgument), derefBeforeAssignmentError);
      this[name] = defaultArgument;

      // fulfill
      return this[name];
    };
    this.get = initStub.call(initializeAndFulfillPromise, name);

    var initializePromise = function(value) {
      assert(!is.undefined(value), undefinedTokenError);

      // initialize promise
      var initializedPromise = function() {
        return fulfillPromise.call(this, value);
      }; 

      // patch and await fulfillment
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: isEnumerable,
        [wrap]: initStub.call(initializedPromise, name)
      });
    };   
    this.set = initStub.call(initializePromise, name);
  } 

  if (isStatic)
    this.configurable = true;

  return this;
}

Object.defineProperties(module, {
  exports: { value: initFuture }
});