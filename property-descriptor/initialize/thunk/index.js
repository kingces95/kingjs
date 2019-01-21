'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { initialize: { name: initializeName } } 
  }
} = require('./dependencies');

/**
 * @this any The descriptor whose functions will thunk to name.
 * @param name The name on thunk to.
 * @returns Returns the descriptor with functions that thunk to name.
 */
function thunk(name) {
  assert(is.stringOrSymbol(name));

  if ('value' in this) {
    this.value = function() {
      return this[name].apply(this, arguments); 
    };
  }

  else {
    this.get = function() { return this[name]; };
    this.set = function(value) { this[name] = value; }
  }

  initializeName.call(this, name, 'thunk');

  return this;
}

module.exports = thunk;