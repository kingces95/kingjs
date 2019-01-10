'use strict';

var {
  '@kingjs/define-property.normalize': normalize,
} = require('@kingjs/require-packages').call(module);

function normalizeFunction() {
  var result = normalize.apply(this, arguments);
  result.descriptor.function = true;
  return result;
}

module.exports = normalizeFunction;
