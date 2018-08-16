'use strict';

var except = require('@kingjs/linq.except');

function distinct(selectId) {
  return except.call(this, undefined, selectId);
};

Object.defineProperties(module, {
  exports: { value: distinct }
});