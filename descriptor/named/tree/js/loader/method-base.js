//'use strict';

var is = require('@kingjs/is');
var assert = require('@kingjs/assert');
var objectEx = require('@kingjs/object-ex')

function base() {
  if (is.symbol(this.name))
    return interfaceMethod(this.name);

  if (!this.declaringType) 
    return null;
    
  return this.declaringType.properties[this.name] || null;
}

function interfaceMethod(id) {
  var base = this.resolve(this.name);
  if (!base)
    return null;

  // resolves to a method on an interface...
  assert(base.isMethod);
  assert(base.declaringType);
  assert(base.declaringType.isInterface);

  // ...which is implemented by this type
  assert(this.scope.isType);
  assert(this.declaringType instanceof iFace.load());
  
  return base;
}

Object.defineProperties(module, {
  exports: { value: base }
});