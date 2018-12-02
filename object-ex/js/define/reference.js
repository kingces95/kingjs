'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var defineStatic = require('./static');
var defineAccessor = require('./accessors');
// var bindThunkGetter = require('../thunk/getter');

var undefinedTokenError = 'Cannot set token to undefined value.';
var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function defineReference(target, name, descriptor) {
  var resolver = descriptor.get;
  var defaultToken = descriptor.defaultToken;
  var isEnumerable = descriptor.enumerable;

  if (descriptor.static) {
    assert(!descriptor.configurable);
    defineStatic(target, name, {
      enumerable: isEnumerable,
      get: bindThunkGetter(target, name),
    });
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