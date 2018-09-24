'use strict';

var create = require('@kingjs/descriptor.create');

function writeSlowPath(descriptor, key, value, copyOnWrite) {

  if (value === descriptor[key] && (value !== undefined || key in descriptor))
    return descriptor;

  if (copyOnWrite || Object.isFrozen(descriptor))
    descriptor = create(descriptor);

  descriptor[key] = value;
  return descriptor;
}

function write(descriptor, key, value, copyOnWrite) {

  if (this === descriptor)
    return writeSlowPath(descriptor, key, value, copyOnWrite);

  descriptor[key] = value;
  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: write }
});