'use strict';

var isEnumerable = require('@kingjs/is-enumerable');

function lazyDefineProperty(name, descriptorPromise) {
  return function() {
    var descriptor = descriptorPromise.apply(this, arguments);
    if (descriptor === undefined)
      return undefined;

    // inherit visibility
    if ('enumerable' in descriptor == false)
      descriptor.enumerable = isEnumerable.call(this, name);

    // configurable default is true
    if ('configurable' in descriptor == false)
      descriptor.configurable = true;

    Object.defineProperty(this, name, descriptor);

    return this[name];
  }
}

Object.defineProperties(module, {
  exports: { value: lazyDefineProperty }
});