'use strict';

// var wrapInheritDefaults = require('./js/wrapInheritDefaults');
// var inflateThunkScorchUpdate = require('./js/inflateThunkScorchUpdate');
var family = require('./js/family');

function transform(descriptor, name, action) {
  // descriptor = wrapInheritDefaults(descriptor, action);
  // descriptor = inflateThunkScorchUpdate(descriptor, name, action);
  // return descriptor;
}

transform.family = family;

Object.defineProperties(module, {
  exports: { value: transform }
});