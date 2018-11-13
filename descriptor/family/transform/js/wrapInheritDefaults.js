'use strict';

var takeLeft = require('@kingjs/func.return-arg-0');

var normalize = require('@kingjs/descriptor.normalize');
var merge = require('@kingjs/descriptor.merge');
var inherit = require('@kingjs/descriptor.inherit');

function wrapInheritDefaults(descriptor, action) {

  // 1. Wrap
  if (action.wrap)
    descriptor = normalize(descriptor, action.wrap);

  // 2. Inherit
  if (action.baseNames) {
    descriptor = inherit.call(
      descriptor, 
      action.baseNames.map(baseName => action.bases[baseName])
    );
  }

  // 3. Merge
  if (action.defaults) {
    descriptor = merge.call(
      descriptor, 
      action.defaults,
      takeLeft
    );
  }

  return descriptor;
}

Object.defineProperties(module, {
  exports: { value: wrapInheritDefaults }
});