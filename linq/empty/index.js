'use strict';

var defineGenerator = require('@kingjs/define-generator');

var empty = defineGenerator(function() {
  return function() { return false; }
})();

Object.defineProperties(module, {
  exports: { value: function() { return empty; } }
});