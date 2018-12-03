'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function initReference(target, name, x, y) {
}

function initReferenceStubs(target, name) {
  var resolver = this.get;
  var defaultToken = this.defaultToken;
  var isEnumerable = this.enumerable;
  var isConfigurable = this.configurable;

  this.set = function(token) {
    assert(!is.undefined(token), undefinedTokenError);

    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: isEnumerable,

      get: function() { 
        var value = resolver.call(this, token);

        Object.defineProperty(this, name, {
          configurable: isConfigurable,
          enumerable: isEnumerable,
          get: () => value
        });

        return value;
      }
    });
  };

  this.get = function() {
    if (defaultToken === undefined)
      assert(false, derefBeforeAssignmentError);

    this[name] = defaultToken;
    return this[name];
  };

  return this;
}

Object.defineProperties(module, {
  exports: { value: initReference }
});