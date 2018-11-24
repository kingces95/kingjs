'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function createReference(target, name, descriptor) {
  var dereference = descriptor.value;
  var defaultAddress = descriptor.default;

  descriptor = {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,

    set: function(address) {
      if (is.undefined(address)) 
        return undefined;
        
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: descriptor.enumerable,
        value: dereference.call(this, address),
      });
    },

    get: function() {
      if (defaultAddress === undefined)
        assert(false, derefBeforeAssignmentError);
        
      this[name] = defaultAddress;
      return this[name];
    },
  }
  
  Object.defineProperty(target, name, descriptor);       
}

Object.defineProperties(module, {
  exports: { value: createReference }
});