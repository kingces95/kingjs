var {
  ['@kingjs']: {
    reflect: { defineProperty }
  }
} = require('./dependencies');

var construct = require('./construct');

/**
 * @description Constrains `kingjs/reflect.define-property` to a single overload
 * for declaring a field.
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param value The value of the field.
*/
function defineAccessor() {
  var { target, name, descriptor } = construct(...arguments);
  return defineProperty(target, name, descriptor);
}

module.exports = defineAccessor;
