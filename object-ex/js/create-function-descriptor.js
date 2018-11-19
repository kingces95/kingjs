'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var lazyDefineConstField = require('./lazy-define-const-field');
var emitGetter = require('./emit-getter');

function createFunctionDescriptor(descriptor, x, y) {
      
  // e.g. function foo() { ... } => 'foo', function foo() { ... }
  if (is.namedFunction(x)) {
    descriptor.name = x.name;
    descriptor.value = x;
  }

  else {
    assert(is.string(x))
    descriptor.name = x;

    // e.g. 'foo', { value: function() { ... } }
    if (is.objectLiteral(y)) {
      for (var name in y)
        descriptor[name] = y[name];
    }

    // e.g. 'foo', function() { ... } => 'foo', { value: function() { ... } }
    else {
      descriptor.value = y;
      
      // e.g. 'foo', 'this.bar' => 'foo', { value: function() { return this.bar; } }
      if (is.string(descriptor.value)) 
        descriptor.value = emitGetter(y);
    }
  }
  
  if (descriptor.lazy) {
    descriptor.value = lazyDefineConstField(
      descriptor.name,
      descriptor.value
    );
  }
  
  return descriptor;        
}

Object.defineProperties(module, {
  exports: { value: createFunctionDescriptor }
});