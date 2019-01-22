'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { rename } 
  }
} = require('./dependencies');

/**
 * @description Makes a descriptor an alias to another function or accessor.
 * 
 * @this any A descriptor with key `value` or keys `get` and/or `set` defined.
 * 
 * @param name The name to which the functions corresponding .
 * 
 * @returns Returns the descriptor with functions that thunk to name.
 */
function alias(name) {
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

  rename.call(this, '${name} (thunk)');

  return this;
}

module.exports = alias;