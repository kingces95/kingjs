var {
  ['@kingjs']: {
    reflect: {
      defineProperty, 
    }
  }
} = require('./dependencies');

var construct = require('./construct');

/**
 * @description Extends `kingjs/reflect.define-property` with richer overloads.
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property.
 * @param descriptor A descriptor which supports additional properties inherited
 * from `kingjs/reflect.define-property`.
 * 
 * @returns Returns `target` if the property was successfully created. 
 * Otherwise `undefined` is returned. If `target` is `null` or
 * `undefined` then `{ name, descriptor }` is returned.
*/
function defineFunction(target, name, descriptor) {

  // construct the arguments
  let { target, name, descriptor } = construct(...arguments);

  return defineProperty(target, name, descriptor);
}

module.exports = defineFunction;
