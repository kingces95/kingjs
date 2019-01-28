var { 
  ['@kingjs']: {
    propertyDescriptor: {
      define
    }
  }
} = require('./dependencies');

/**
 * @description Calls define after normalizing overloads and applying defaults.
 * 
 * @param construct A callback to normalize overloads.
 * @param defaults Default properties to assign to the descriptor.
 * 
 * @returns Returns `target`.
 * 
 * @callback construct
 * @returns Returns `{ target, name, descriptor }`.
 */
function defineWith(name, construct, defaults) {
    return ({ })[name] = function(target) {

      // normalize overloads
      let { name, descriptor } = construct(...arguments);

      // assign defaults
      if (defaults)
        descriptor = { ...defaults, ...descriptor };

      // define descriptor + lambdize, callback, extends, lazy
      return define(target, name, descriptor);
    }
}

module.exports = defineWith;