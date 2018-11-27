'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function initReference(name, dereference, defaultAddress) {
  assert('configurable' in this);
  assert('enumerable' in this);
  assert(is.function(dereference));

  var isEnumerable = this.enumerable;

  this.set = function(address) {
    if (is.undefined(address)) 
      return undefined;

    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: isEnumerable,

      get: function() { 
        var value = dereference.call(this, address);
        if (is.undefined(value))
          return undefined;

        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: isEnumerable,
          writable: false,
          value: value,
        });

        return value;
      }
    })
  };

  this.get = function() {
    if (defaultAddress === undefined)
      assert(false, derefBeforeAssignmentError);

    this[name] = defaultAddress;
    return this[name];
  };

  return this;
}

Object.defineProperties(module, {
  exports: { value: initReference }
});