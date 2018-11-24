'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');

var derefBeforeAssignmentError = 
  'Unexpected dereference attempted before address assignment.';

function initReference(name) {
  assert('configurable' in this);
  assert('enumerable' in this);
  assert(is.function(this.value));

  var dereference = this.value;
  var defaultAddress = this.default;
  var isEnumerable = this.enumerable;

  delete this.value;

  this.set = function(address) {
    if (is.undefined(address)) 
      return undefined;
      
    Object.defineProperty(this, name, {
      configurable: false,
      enumerable: isEnumerable,
      value: dereference.call(this, address),
    });
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