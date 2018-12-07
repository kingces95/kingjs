//'use strict';

var assert = require('@kingjs/assert');

function track(typeOrMethod) {
  if (typeOrMethod.isMethod)
    trackExtension.call(this, typeOrMethod);
  else
    trackImplementation.call(this, typeOrMethod);
}

function trackImplementation(type) {
  assert(type.isClass);
  assert(this.id in type.vtable);
  this.implementations[type.id] = type;
}

function trackExtension(method) {
  assert(method.isMethod);
  assert(method.extends == this);
  this.extensions[method.id] = method;
}

Object.defineProperties(module, {
  exports: { value: track }
});