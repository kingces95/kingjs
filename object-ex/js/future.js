//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var initStub = require('./stub');

var unresolvedPromiseError = 'Promise returned undefined value.';
var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 'Unexpected dereference attempted before address assignment.';

function initFuture(name, isConfigurable) {
  var isFuture = this.future || false;
  var isStatic = this.static || false;
  var isEnumerable = this.enumerable || false;
  var isFunction = this.function || false;
  var isWriteOnce = this.writeOnce || false;
  var defaultArgument = this.argument;
  var wrap = isFunction ? 'value' : 'get';

  assert(isFuture);
    
  var promise = this.value || this.get;
  
  var fulfillPromise = function(argument) {

    // fulfill
    var value = !isWriteOnce ? promise.call(this) : promise.call(this, argument);
    assert(!is.undefined(value), unresolvedPromiseError);

    // patch
    Object.defineProperty(this, name, {
      configurable: isConfigurable,
      enumerable: isEnumerable,
      value: isFunction ? () => value : value
    });

    return value;
  };
  this[wrap] = initStub.call(fulfillPromise, name);

  if (writeOnce) {

    // deffer bindPromise until initialization
    var initializeAndFulfillPromise = function() {

      // initialize with default
      assert(!is.undefined(defaultArgument), derefBeforeAssignmentError);
      this[name] = defaultArgument;

      // fulfill
      return this[name];
    };
    this.get = initStub.call(initializePromise, name);

    var initializePromise = function(value) {

      // initialize promise
      assert(!is.undefined(value), undefinedTokenError);
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