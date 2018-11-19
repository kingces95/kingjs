'use strict';

function createFieldDescriptor(descriptor, name, value) {
  descriptor.name = name;
  descriptor.value = value;
  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: createFieldDescriptor }
});