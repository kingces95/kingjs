'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { rename } 
  }
} = require('./dependencies');

/**
 * @description Creates a descriptor that is an alias of another accessor or function.
 * 
 * @param name The name of the accessor or function being aliased.
 * @param [isFunction=false] True, if the alias target is a function. 
 * 
 * @returns A descriptor which will access or invoke a member of the specified name.
 */
function alias(name, isFunction) {
  assert(is.stringOrSymbol(name));

  var descriptor = { };

  if (isFunction) {
    descriptor.value = function() {
      return this[name].apply(this, arguments); 
    };
  }

  else {
    descriptor.get = function() { return this[name]; };
    descriptor.set = function(value) { this[name] = value; }
  }

  rename.call(descriptor, '${name} (alias)');

  return descriptor;
}

module.exports = alias;