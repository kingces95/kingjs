'use strict';

var updateHelper = require('../nested/update');

var children = { '*': undefined };

function update(callback, thisArg) {
  return updateHelper(this, children, callback, thisArg);
}

Object.defineProperties(module, {
  exports: { value: update }
});