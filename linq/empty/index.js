'use strict';

var define = require('@kingjs/enumerable.define');

var empty = define(function() {
  return function() { return false; }
})();

Object.defineProperties(module, {
  exports: { value: function() { return empty; } }
});