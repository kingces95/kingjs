'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var lazyDefineProperty = require('./lazy-define-property');
var lazyDefineConstField = require('./lazy-define-const-field');
var createFunctionDescriptor = require('./create-function-descriptor');

function createReferenceDescriptor(descriptor, x, y, z) {
  descriptor = createFunctionDescriptor(descriptor, x, y, z);

  assert(descriptor.value);

  var name = descriptor.name;

  var dereference = descriptor.value;
  delete descriptor.value;

  var defaultAddress = descriptor.default || descriptor.extra;

  descriptor.set = 
    lazyDefineProperty(name, 
      address => {

        if (is.undefined(address)) {
          address = defaultAddress;
          if (is.undefined(address))
            return undefined;
        }
        
        return {
          get: lazyDefineConstField(name, function getter() {
            return dereference.call(this, address);
          })
        }
      }
    );

  descriptor.get = () => 
    assert(false, 'Unexpected dereference attempted before address assignment.');
  
  return descriptor;        
}

Object.defineProperties(module, {
  exports: { value: createReferenceDescriptor }
});