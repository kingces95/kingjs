'use strict';
var assert = require('assert');

var {
  ['@kingjs']: { 
    is,
    propertyDescriptor: { rename } 
  }
} = require('./dependencies');

/**
 * @description Packages the a target, a name, and a descriptor that 
 * is an alias of another accessor or function.
 * 
 * @param target The target on which the property will be defined.
 * @param alias The alias.
 * @param name The name of the accessor or function being aliased.
 * @param [isFunction=false] True, if the alias target is a function. 
 * 
 * @returns An object with properties `target`, `name`, and `descriptor` 
 * which describes thunks to a property of the specified `name`.
 */
function createAlias(target, name, alias, isFunction) {
  assert(is.stringOrSymbol(alias));

  var descriptor = { };

  if (isFunction) {
    descriptor.value = function() {
      return this[alias].apply(this, arguments); 
    };
  }

  else {
    descriptor.get = function() { return this[alias]; };
    descriptor.set = function(value) { this[alias] = value; }
  }

  rename.call(descriptor, `${alias} -> ${name}`);

  return { target, name, descriptor };
}

module.exports = createAlias;