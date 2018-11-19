'use strict';

var lazyDefineProperty = require('./lazy-define-property');

function lazyDefineConstField(name, valuePromise) {
  return lazyDefineProperty(name, function() {
    var value = valuePromise.apply(this, arguments);

    // allows debugger evaluation of the property before the program would
    // naturally evaluate the property without solidifying property value.
    if (value === undefined)
      return undefined;

    return {
      configurable: false,
      writable: false,
      value: value,
    }
  })
};

Object.defineProperties(module, {
  exports: { value: lazyDefineConstField }
});