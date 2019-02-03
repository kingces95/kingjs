var {
  ['@kingjs']: {
    reflect: { defineProperty }
  }
} = require('./dependencies');

var construct = require('./construct');

/**
 * @description Extends `kingjs/reflect.define-property` with richer overloads 
 * for declaring accessors and makes accessors enumerable by default.
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param descriptor A descriptor describing the property.
*/
function defineAccessor() {
  var { target, name, descriptor } = construct(...arguments);
  return defineProperty(target, name, descriptor);
}

module.exports = defineAccessor;
