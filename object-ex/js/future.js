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
  var defaultArgument = this.argument;
  var wrap = isFunction ? 'value' : 'get';

  assert(isFuture);
    
  var promise = this.value || this.get;
  
  var bindPromise = function(argument) {
    var result = function fulfillPromise() {

      // evaluate
      var value = argument === undefined ? 
        promise.call(this) : promise.call(this, argument);

      assert(!is.undefined(value), unresolvedPromiseError);

      // path
      Object.defineProperty(this, name, {
        configurable: isConfigurable,
        enumerable: isEnumerable,
        value: isFunction ? () => value : value
      });

      return value;
    };
    return initStub.call(result, name);
  };

  if (this.set) {
    this.set = initStub.call(function setPromise(value) {

      // bind promise
      assert(!is.undefined(value), undefinedTokenError);
      var boundPromise = bindPromise(value);

      // patch
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: isEnumerable,
        get: boundPromise
      });
    }, name);    

    this.get = initStub.call(function getPromise() {
      assert(!is.undefined(defaultArgument), derefBeforeAssignmentError);
      this[name] = defaultArgument;
      return this[name];
    }, name);
  }
  else {
    this[wrap] = bindPromise(this.argument);
  }

  if (isStatic)
    this.configurable = true;

  return this;
}

Object.defineProperties(module, {
  exports: { value: initFuture }
});