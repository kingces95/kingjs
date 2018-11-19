'use strict';

var lazyDefineConstField = require('./lazy-define-const-field');

function createSetOnceDescriptor(descriptor, name) {
  descriptor.name = name;
  descriptor.get = () => undefined;
  descriptor.set = lazyDefineConstField(name, value => value);
  return descriptor;        
}

Object.defineProperties(module, {
  exports: { value: createSetOnceDescriptor }
});