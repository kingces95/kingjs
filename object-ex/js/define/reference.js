'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineThunkToStatic = require('./static');
var defineAccessor = require('./accessors');

var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function defineReference(target, name, descriptor) {
  var isAccessor = true;
  var resolver = descriptor.get;
  var defaultToken = descriptor.defaultToken;
  var isEnumerable = descriptor.enumerable;

  if (descriptor.static) {
    assert(!descriptor.configurable);
    defineThunkToStatic(target, name, isEnumerable, isAccessor);
  }

  descriptor.set = function(token) {
    assert(!is.undefined(token), undefinedTokenError);

    defineAccessor(this, name, {
      enumerable: isEnumerable,
      static: true,
      lazy: true,
      get: function() { 
        return resolver.call(this, token);
      }
    });
  };

  descriptor.get = function() {
    if (defaultToken === undefined)
      assert(false, derefBeforeAssignmentError);

    this[name] = defaultToken;
    return this[name];
  };

  Object.defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineReference }
});