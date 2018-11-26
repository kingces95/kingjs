'use strict';

var defineProperty = require('./property');

function defineField(target, name, descriptor) {
  defineProperty(target, name, descriptor);
  return target;
}

Object.defineProperties(module, {
  exports: { value: defineField }
});