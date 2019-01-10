'use strict';
var assert = require('assert');

var {
  '@kingjs/is': is,
  '@kingjs/define-property.initialize-name': initializeName,
} = require('@kingjs/require-packages').call(module);

function initializeThunk(name) {
  assert(is.stringOrSymbol(name));

  if (this.function) {
    this.value = function() {
      return this[name].apply(this, arguments); 
    };
  }

  else {
    this.get = function() { return this[name]; };
    this.set = function(value) { this[name] = value; }
  }

  initializeName.call(this, name, 'thunk');
}

module.exports = initializeThunk;