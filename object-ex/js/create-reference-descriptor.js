'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var lazyDefineProperty = require('./lazy-define-property');
var lazyDefineConstField = require('./lazy-define-const-field');
var createFunctionDescriptor = require('./create-function-descriptor');

function createReferenceDescriptor(descriptor, x, y) {
  descriptor = createFunctionDescriptor(descriptor, x, y);
  assert(descriptor.value);

  var name = descriptor.name;

  var dereference = descriptor.value;
  delete descriptor.value;

  descriptor.set = 
    lazyDefineProperty(name, 
      address => is.undefined(address) ? undefined : {
        get: lazyDefineConstField(name, function getter() {
          return dereference.call(this, address);
        })
      }
    );
  
  return descriptor;        
}

Object.defineProperties(module, {
  exports: { value: createReferenceDescriptor }
});