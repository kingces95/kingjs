'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var lazyDefineConstField = require('./lazy-define-const-field');
var emitGetter = require('./emit-getter');
var emitSetter = require('./emit-setter');

function createAccessorDescriptor(descriptor, x, y, z) {
  var get, set;

  // e.g. { get: function foo() { ... } } => 'foo', { get: function foo() { ... } }
  if (is.objectLiteral(x)) {
    get = x.get;
    set = x.set;
  }
  
  else if (!is.objectLiteral(y)) {
    
    // e.g. 'foo', function() { ... } => 'foo', { get: function() { ... } }
    // e.g. 'foo', 'this.bar' => 'foo', { get: function() { return this.bar; } }
    if (is.string(x)) {
      descriptor.name = x;
      get = y;
      set = z;
    }

    // e.g. function foo() { ... } => 'foo', { get: function foo() { ... } }
    else {
      get = x;
      set = y;
    } 
  }
 
  // e.g. 'foo', { get: function() { ... } }
  // e.g. 'foo', { get: 'this.bar' } => 'foo', { get: function() { ... } }
  else {
    descriptor.name = x;
    get = y.get;
    set = y.set;
  }

  if (!descriptor.name)
    descriptor.name = get ? get.name : set.name;

  if (is.string(get))
    get = emitGetter(get);
  if (is.string(set))
    set = emitSetter(set);
    
  if (get) 
    descriptor.get = get;
  if (set) 
    descriptor.set = set;
  
  if (descriptor.lazy) {
    assert(descriptor.get);
    assert(!descriptor.set);
    descriptor.get = lazyDefineConstField(
      descriptor.name,
      descriptor.get
    );
  }

  assert(is.string(descriptor.name));
  assert(descriptor.get || descriptor.set);
  assert(!descriptor.get || is.function(descriptor.get));
  assert(!descriptor.set || is.function(descriptor.set));
  
  return descriptor;        
}

Object.defineProperties(module, {
  exports: { value: createAccessorDescriptor }
});